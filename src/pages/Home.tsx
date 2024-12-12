import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
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

const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({ queryKey: ["blogs"], queryFn: fetchBlogs });

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return <div>{t("errorLoadingBlogs")}</div>;
  }

  const authors = Array.from(new Set(blogs?.map((blog) => blog.user_id) || []));

  return (
    <div className="flex flex-col p-10 lg:flex-row">
      <div className="flex-1">
        <Button
          onClick={() => navigate("/add-blog")}
          className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:border-blue-300 focus:outline-none focus:ring dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {t("addBlog")}
        </Button>
        <div className="flex flex-col gap-4">
          {blogs?.map((blog) => (
            <Card key={blog.id} className="rounded-3xl border p-10">
              <img
                src={blog.img_url || ""}
                alt={blog.title_en || blog.title_ka || ""}
                className="mb-4 h-72 w-full rounded-3xl object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {blog.title_en || blog.title_ka}
                </CardTitle>
                <CardDescription>
                  {blog.description_en || blog.description_ka}
                </CardDescription>
                <p>
                  {blog.user_id} -{" "}
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-4 w-full lg:mt-0 lg:w-1/3 lg:pl-4">
        <Card className="mb-4 rounded-3xl border p-4">
          <CardHeader>
            <CardTitle className="mb-2 text-xl font-bold">
              {t("featuredAuthors")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {authors.map((author) => (
                <li key={author} className="mb-2">
                  <Link
                    to={`/author/${author}`}
                    className="text-blue-500 hover:underline"
                  >
                    {author}
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
