import axios from "axios";
import { User } from "./users";

export type LoadSessionRequest = {
  token: string | null;
};

const loadSession = async ({ token }: LoadSessionRequest) => {
  const currentUser = await axios.get<User>("/api/currentUser", {
    headers: { Authorization: token },
  });

  return currentUser.data;
};

export const sessionApi = {
  loadSession,
};
