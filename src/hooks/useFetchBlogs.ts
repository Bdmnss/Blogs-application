import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { QueryKeysEnum } from "@/enums/queryKeysEnum";

const fetchBlogs = async (filter: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .ilike("title_en", `%${filter}%`)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchBlogs = (filter: string) => {
  return useQuery({
    queryKey: [QueryKeysEnum.BLOGS, filter],
    queryFn: () => fetchBlogs(filter),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};