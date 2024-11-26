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

interface ProfileFormData {
  firstNameKa: string;
  lastNameKa: string;
  firstNameEn: string;
  lastNameEn: string;
  avatarUrl: string;
  phoneNumber: string;
}

const validationRules = {
  firstNameKa: {
    minLength: {
      value: 2,
      message: "firstNameKaMinLength",
    },
    maxLength: {
      value: 30,
      message: "firstNameKaMaxLength",
    },
  },
  lastNameKa: {
    minLength: {
      value: 2,
      message: "lastNameKaMinLength",
    },
    maxLength: {
      value: 30,
      message: "lastNameKaMaxLength",
    },
  },
  firstNameEn: {
    minLength: {
      value: 2,
      message: "firstNameEnMinLength",
    },
    maxLength: {
      value: 30,
      message: "firstNameEnMaxLength",
    },
  },
  lastNameEn: {
    minLength: {
      value: 2,
      message: "lastNameEnMinLength",
    },
    maxLength: {
      value: 30,
      message: "lastNameEnMaxLength",
    },
  },
  avatarUrl: {},
  phoneNumber: {
    minLength: {
      value: 9,
      message: "phoneNumberLength",
    },
    maxLength: {
      value: 9,
      message: "phoneNumberLength",
    },
  },
};

function Profile() {
  const { t } = useTranslation();
  const [user, setUser] = useAtom(userAtom);
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

  console.log(user);

  const onSubmit = async (data: ProfileFormData) => {
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="firstNameKa"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("firstNameKa")}
              </label>
              <Controller
                name="firstNameKa"
                control={control}
                rules={validationRules.firstNameKa}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="firstNameKa"
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.firstNameKa && (
                <p className="mt-2 text-sm text-red-600">
                  {t((errors.firstNameKa?.message as string) || "")}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastNameKa"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("lastNameKa")}
              </label>
              <Controller
                name="lastNameKa"
                control={control}
                rules={validationRules.lastNameKa}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="lastNameKa"
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.lastNameKa && (
                <p className="mt-2 text-sm text-red-600">
                  {t((errors.lastNameKa?.message as string) || "")}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="firstNameEn"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("firstNameEn")}
              </label>
              <Controller
                name="firstNameEn"
                control={control}
                rules={validationRules.firstNameEn}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="firstNameEn"
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.firstNameEn && (
                <p className="mt-2 text-sm text-red-600">
                  {t((errors.firstNameEn?.message as string) || "")}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastNameEn"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("lastNameEn")}
              </label>
              <Controller
                name="lastNameEn"
                control={control}
                rules={validationRules.lastNameEn}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="lastNameEn"
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.lastNameEn && (
                <p className="mt-2 text-sm text-red-600">
                  {t((errors.lastNameEn?.message as string) || "")}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="avatarUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("avatarUrl")}
              </label>
              <Controller
                name="avatarUrl"
                control={control}
                rules={validationRules.avatarUrl}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="avatarUrl"
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.avatarUrl && (
                <p className="mt-2 text-sm text-red-600">
                  {t((errors.avatarUrl?.message as string) || "")}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("phoneNumber")}
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={validationRules.phoneNumber}
                render={({ field }) => (
                  <Input
                    type="number"
                    id="phoneNumber"
                    {...field}
                    className="numberInput no-spinner mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600">
                  {t((errors.phoneNumber?.message as string) || "")}
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
