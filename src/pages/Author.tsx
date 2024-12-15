import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import data from "../../data.json";

function Author() {
  const { t } = useTranslation();
  const { authorName } = useParams<{ authorName: string }>();
  const authorBlogs = data.filter((data) => data.author === authorName);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-12 dark:bg-gray-900">
      <Card className="mb-12 w-full max-w-5xl">
        <CardContent className="flex flex-col items-center lg:flex-row lg:items-start">
          <img
            src="/path/to/author/profile.jpg"
            alt={authorName}
            className="h-40 w-40 rounded-full shadow-md"
          />
          <div className="mt-6 text-center lg:ml-12 lg:mt-0 lg:text-left">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
              {authorName}
            </h1>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              {t("authorAbout")}
            </p>
            <div className="mb-6 flex justify-center space-x-6 lg:justify-start">
              <a
                href="https://twitter.com/author"
                className="text-xl text-blue-500 hover:underline"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/in/author"
                className="text-xl text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/author"
                className="text-xl text-blue-500 hover:underline"
              >
                GitHub
              </a>
            </div>
            <div className="flex justify-center space-x-6 lg:justify-start">
              <span className="text-lg">{t("followers")}: 1000</span>
              <span className="text-lg">{t("following")}: 500</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articles" className="w-full max-w-5xl">
        <TabsList className="mb-6 flex justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
          <TabsTrigger value="articles" className="px-8 py-3 text-xl">
            {t("articles")}
          </TabsTrigger>
          <TabsTrigger value="about" className="px-8 py-3 text-xl">
            {t("about")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <div className="flex flex-wrap justify-center gap-6">
            {authorBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="w-full rounded-lg shadow-md md:w-1/2 lg:w-1/3"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle className="text-2xl">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    {blog.description}
                  </CardDescription>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {blog.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="about">
          <Card className="rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">{t("about")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg">
                {t("authorAboutContent")}
              </CardDescription>
              <h3 className="mt-6 text-xl font-bold">{t("skills")}</h3>
              <ul className="list-inside list-disc text-lg">
                <li>{t("skill1")}</li>
                <li>{t("skill2")}</li>
                <li>{t("skill3")}</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Author;
