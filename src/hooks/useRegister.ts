import { useMutation } from "@tanstack/react-query";
import { register } from "@/supabase/auth";
import { AuthError, Session, User } from "@supabase/supabase-js";

interface RegisterData {
  email: string;
  password: string;
}

interface RegisterResponse {
  data: {
    user: User | null;
    session: Session | null;
  };
  error: AuthError | null;
}

export const useRegister = (onSuccess: (data: RegisterResponse) => void) => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterData) => register(data),
    onSuccess,
  });
};