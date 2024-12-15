import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PopularTagsProps {
  data: { id: number; tags: string[] }[];
}

const PopularTags: React.FC<PopularTagsProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card className="mb-4 rounded-3xl border p-4">
      <CardHeader>
        <CardTitle className="mb-2 text-xl font-bold">
          {t("popularTags")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap">
          {data.flatMap((item) =>
            item.tags.map((tag, index) => (
              <span
                key={`${item.id}-${index}`}
                className="tag mb-2 mr-2 rounded-full px-2 py-1 text-sm"
              >
                {tag}
              </span>
            )),
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularTags;
