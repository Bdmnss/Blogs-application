import { useMutation } from "@tanstack/react-query";
import { login } from "@/supabase/auth";
import { User, WeakPassword } from "@supabase/supabase-js";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    user: User | null;
    session: any | null;
    weakPassword?: WeakPassword | null | undefined;
  };
}

export const useLogin = (onSuccess: (data: LoginResponse) => void) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) => login(data),
    onSuccess,
  });
};