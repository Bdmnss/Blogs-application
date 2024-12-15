import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import qs from "qs";
import { useDebounce } from "@/hooks/useDebounce";
import { useAtom } from "jotai";
import { filterAtom, languageAtom } from "@/store/atoms";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import data from "../../data.json";

dayjs.extend(relativeTime);

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

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useAtom(filterAtom);
  const [language] = useAtom(languageAtom);
  const debouncedFilter = useDebounce(filter, 500);

  useEffect(() => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (params.filter) {
      setFilter(params.filter as string);
    }
  }, [location.search, setFilter]);

  useEffect(() => {
    const queryString = qs.stringify(
      debouncedFilter ? { filter: debouncedFilter } : {},
      { addQueryPrefix: true },
    );
    navigate(queryString, { replace: true });
  }, [debouncedFilter, navigate]);

  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", debouncedFilter],
    queryFn: () => fetchBlogs(debouncedFilter),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return <div>{t("errorLoadingBlogs")}</div>;
  }

  const formatDate = (date: string) => {
    const now = dayjs();
    const blogDate = dayjs(date);
    const diffInHours = now.diff(blogDate, "hour");

    if (diffInHours < 24) {
      return blogDate.fromNow();
    } else {
      return blogDate.format("HH:mm - DD/MM/YYYY");
    }
  };

  return (
    <div className="flex flex-col p-10 lg:flex-row">
      <div className="flex-1">
        <Input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={t("search")}
          className="mb-4 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        />
        <Button
          onClick={() => navigate("/add-blog")}
          className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:border-blue-300 focus:outline-none focus:ring dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {t("addBlog")}
        </Button>
        <div className="flex flex-col gap-4">
          {blogs?.length === 0 ? (
            <div>{t("noResults")}</div>
          ) : (
            blogs?.map((blog) => (
              <Card key={blog.id} className="rounded-3xl border p-10">
                <img
                  src={blog.img_url || ""}
                  alt={blog.title_en || blog.title_ka || ""}
                  className="mb-4 h-72 w-full rounded-3xl object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {language === "en" ? blog.title_en : blog.title_ka}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? blog.description_en
                      : blog.description_ka}
                  </CardDescription>
                  <p>{formatDate(blog.created_at)}</p>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
      <div className="mt-4 w-full lg:mt-0 lg:w-1/3 lg:pl-4">
        <Card className="mb-4 rounded-3xl border p-4">
          <CardHeader>
            <CardTitle className="mb-2 text-xl font-bold">
              {t("popularTags")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap">
              {data.map((data) => (
                <span
                  key={data.id}
                  className="tag mb-2 mr-2 rounded-full px-2 py-1 text-sm"
                >
                  {data.tags}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border p-4">
          <CardHeader>
            <CardTitle className="mb-2 text-xl font-bold">
              {t("featuredAuthors")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {data.map((data) => (
                <li key={data.id} className="mb-2">
                  <Link
                    to={`/author/${data.author}`}
                    className="text-blue-500 hover:underline"
                  >
                    {data.author}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
