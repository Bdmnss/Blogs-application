import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { supabase } from "@/supabase";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";

interface BlogFormData {
  title_en: string;
  title_ka: string;
  description_en: string;
  description_ka: string;
  img_url: string;
}

const AddBlogForm = () => {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);
  const { control, handleSubmit, reset, setError } = useForm<BlogFormData>();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onSubmit = async (data: BlogFormData) => {
    let img_url = data.img_url;

    if (imageFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("blog_images")
        .upload(imageFile.name, imageFile);

      if (uploadError) {
        console.error(uploadError);
        alert(t("errorUploadingImage"));
        return;
      }

      img_url = uploadData?.path
        ? supabase.storage.from("blog-images").getPublicUrl(uploadData.path)
            .data.publicUrl
        : "";
    }

    const { error } = await supabase.from("blogs").insert({
      ...data,
      img_url,
      user_id: user?.id,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error(error);
      if (error.code === "23505") {
        setError("title_en", { type: "manual", message: t("titleExists") });
        setError("title_ka", { type: "manual", message: t("titleExists") });
      } else {
        alert(t("errorCreatingBlog"));
      }
    } else {
      alert(t("blogCreated"));
      reset();
      setImageFile(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  return (
    <Card className="mb-4 rounded-3xl border p-4">
      <CardHeader>
        <CardTitle className="mb-2 text-xl font-bold">{t("addBlog")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="title_en"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("titleEn")}
            </label>
            <Controller
              name="title_en"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="title_en"
                  {...field}
                  className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="title_ka"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("titleKa")}
            </label>
            <Controller
              name="title_ka"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="title_ka"
                  {...field}
                  className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="description_en"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("descriptionEn")}
            </label>
            <Controller
              name="description_en"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="description_en"
                  {...field}
                  className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="description_ka"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("descriptionKa")}
            </label>
            <Controller
              name="description_ka"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="description_ka"
                  {...field}
                  className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="img_url"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("imgUrl")}
            </label>
            <input
              type="file"
              id="img_url"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <CardFooter>
            <Button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:border-blue-300 focus:outline-none focus:ring dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {t("addBlog")}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBlogForm;
