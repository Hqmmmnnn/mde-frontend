import { useStore } from "effector-react";
import { useEffect } from "react";
import { $session, loadSessionWithTokenFx } from "../features/common/session-model";
import { $token } from "../features/common/token-model";

type AccountLoaderProps = {
  children: React.ReactElement;
};

export const AccountLoader = ({ children }: AccountLoaderProps) => {
  const session = useStore($session);
  const token = useStore($token);

  useEffect(() => {
    loadSessionWithTokenFx();
  }, []);

  if (token && !session) return null;

  return children;
};
