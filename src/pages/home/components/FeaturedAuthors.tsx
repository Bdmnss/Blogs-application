import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AppRouteEnums } from "@/enums/AppRouteEnums";

interface FeaturedAuthorsProps {
  data: { id: number; author: string }[];
}

const FeaturedAuthors: React.FC<FeaturedAuthorsProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card className="rounded-3xl border p-4">
      <CardHeader>
        <CardTitle className="mb-2 text-xl font-bold">
          {t("featuredAuthors")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {data.map((author) => (
            <li key={author.id} className="mb-2">
              <Link
                to={AppRouteEnums.AUTHOR.replace(":author", author.author)}
                className="text-blue-500 hover:underline"
              >
                {author.author}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeaturedAuthors;
