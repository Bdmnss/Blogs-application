import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { supabase } from "@/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Profile() {
  const { t } = useTranslation();
  const [user, setUser] = useAtom(userAtom);
  console.log(user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstNameKa: user?.full_name_ka?.split(" ")[0] || "",
      lastNameKa: user?.full_name_ka?.split(" ")[1] || "",
      firstNameEn: user?.full_name_en?.split(" ")[0] || "",
      lastNameEn: user?.full_name_en?.split(" ")[1] || "",
      avatarUrl: user?.avatar_url || "",
      phoneNumber: user?.phone_number || "",
    },
  });

  const onSubmit = async (data: {
    firstNameKa: string;
    lastNameKa: string;
    firstNameEn: string;
    lastNameEn: string;
    avatarUrl: string;
    phoneNumber: string;
  }) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name_ka: `${data.firstNameKa} ${data.lastNameKa}`,
        full_name_en: `${data.firstNameEn} ${data.lastNameEn}`,
        avatar_url: data.avatarUrl,
        phone_number: data.phoneNumber,
      })
      .eq("id", user.id);

    if (error) {
      console.error(error);
    } else {
      const updatedUser = {
        ...user,
        full_name_ka: `${data.firstNameKa} ${data.lastNameKa}`,
        full_name_en: `${data.firstNameEn} ${data.lastNameEn}`,
        avatar_url: data.avatarUrl,
        phone_number: data.phoneNumber,
      };
      setUser(updatedUser);
      console.log(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert(t("profileUpdated"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t("profile")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("firstNameKa")}
              </label>
              <Controller
                name="firstNameKa"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.firstNameKa && (
                <p className="mt-2 text-sm text-red-600">
                  {typeof errors.firstNameKa?.message === "string" &&
                    errors.firstNameKa.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("lastNameKa")}
              </label>
              <Controller
                name="lastNameKa"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.lastNameKa && (
                <p className="mt-2 text-sm text-red-600">
                  {typeof errors.lastNameKa?.message === "string" &&
                    errors.lastNameKa.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("firstNameEn")}
              </label>
              <Controller
                name="firstNameEn"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.firstNameEn && (
                <p className="mt-2 text-sm text-red-600">
                  {typeof errors.firstNameEn?.message === "string" &&
                    errors.firstNameEn.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("lastNameEn")}
              </label>
              <Controller
                name="lastNameEn"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.lastNameEn && (
                <p className="mt-2 text-sm text-red-600">
                  {typeof errors.lastNameEn?.message === "string" &&
                    errors.lastNameEn.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("avatarUrl")}
              </label>
              <Controller
                name="avatarUrl"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.avatarUrl && (
                <p className="mt-2 text-sm text-red-600">
                  {typeof errors.avatarUrl?.message === "string" &&
                    errors.avatarUrl.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("phoneNumber")}
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600">
                  {typeof errors.phoneNumber?.message === "string" &&
                    errors.phoneNumber.message}
                </p>
              )}
            </div>
            <CardFooter>
              <Button
                type="submit"
                className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:border-blue-300 focus:outline-none focus:ring dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {t("updateProfile")}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
