import { useStore } from "effector-react";
import { Redirect } from "react-router";
import { $session } from "../features/common/session-model";

type WithSecureProps = {
  children: React.ReactElement;
};

export const WithSecure = ({ children }: WithSecureProps) => {
  const currentUser = useStore($session);

  if (currentUser?.role !== "ADMIN") {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return children;
};
