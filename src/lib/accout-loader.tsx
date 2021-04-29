import { useStore } from "effector-react";
import { useEffect } from "react";
import { $session, loadSessionFx } from "../features/common/session/session-model";
import { $token } from "../features/common/token";

type AccountLoaderProps = {
  children: React.ReactElement;
};

export const AccountLoader = ({ children }: AccountLoaderProps) => {
  const session = useStore($session);
  const token = useStore($token);

  useEffect(() => {
    loadSessionFx();
  }, []);

  if (token && !session) return null;

  return children;
};
