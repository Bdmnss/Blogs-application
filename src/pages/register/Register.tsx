import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/supabase/auth";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validationRules } from "./validations";
import { AppRouteEnums } from "@/routes/AppRouteEnums";

function Register() {
  const { t } = useTranslation();
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{ email: string; password: string; confirmPassword: string }>();

  const { mutate: handleRegister } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      const user = data.data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(AppRouteEnums.HOME);
    },
  });

  const onSubmit = (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    handleRegister({ email: data.email, password: data.password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t("register")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("email")}
              </Label>
              <Controller
                name="email"
                control={control}
                rules={validationRules.email}
                render={({ field }) => (
                  <Input
                    id="email"
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {t(errors.email?.message || "")}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("password")}
              </Label>
              <Controller
                name="password"
                control={control}
                rules={validationRules.password}
                render={({ field }) => (
                  <Input
                    type="password"
                    id="password"
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {t(errors.password?.message || "")}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("confirmPassword")}
              </Label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  ...validationRules.confirmPassword,
                  validate: (value) =>
                    value === getValues().password || t("passwordsDoNotMatch"),
                }}
                render={({ field }) => (
                  <Input
                    type="password"
                    id="confirmPassword"
                    {...field}
                    className="mt-1 w-full rounded border px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {t(errors.confirmPassword?.message || "")}
                </p>
              )}
            </div>
            <CardFooter>
              <Button
                type="submit"
                className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:border-blue-300 focus:outline-none focus:ring dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {t("register")}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
