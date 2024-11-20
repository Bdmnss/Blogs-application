import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-900 dark:text-gray-100">
        {t("about")}
      </h1>

      <div className="mb-16 flex flex-col items-center lg:flex-row">
        <div className="lg:w-1/2">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t("ourMission")}
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {t("ourMissionContent")}
          </p>
        </div>
        <div className="lg:w-1/2 lg:pl-8">
          <img
            src="/placeholder.png"
            alt="Our Mission"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("whatWeOffer")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>{t("offer1Title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("offer1Description")}</CardDescription>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>{t("offer2Title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("offer2Description")}</CardDescription>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>{t("offer3Title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("offer3Description")}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("ourStory")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t("ourStoryContent")}
        </p>
      </div>
    </div>
  );
}

export default About;
