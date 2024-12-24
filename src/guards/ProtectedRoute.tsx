import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { AppRouteEnums } from "@/enums/AppRouteEnums";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [user] = useAtom(userAtom);

  if (user) {
    return <Navigate to={AppRouteEnums.HOME} />;
  }

  return children;
}

export default ProtectedRoute;
