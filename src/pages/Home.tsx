import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  tags: string[];
  image: string;
}

function Home() {
  const { t } = useTranslation();
  const blogs: Blog[] = t("blogs", { returnObjects: true }) as Blog[];
  const tags = Array.from(
    new Set(
      blogs.reduce((acc: string[], blog: Blog) => acc.concat(blog.tags), []),
    ),
  );
  const authors = Array.from(new Set(blogs.map((blog) => blog.author)));

  return (
    <div className="flex flex-col p-10 lg:flex-row">
      <div className="flex-1">
        <div className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="rounded-3xl border p-10">
              <img
                src={blog.image}
                alt={blog.title}
                className="mb-4 h-72 w-full rounded-3xl object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {blog.title}
                </CardTitle>
                <CardDescription>{blog.description}</CardDescription>
                <p>
                  {blog.author} - {new Date(blog.date).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag mb-2 mr-2 rounded-full px-2 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
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
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="tag mb-2 mr-2 rounded-full px-2 py-1 text-sm"
                >
                  {tag}
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
              {authors.map((author) => (
                <li key={author} className="mb-2">
                  {author}
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
