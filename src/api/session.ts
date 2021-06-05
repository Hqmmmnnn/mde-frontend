import axios from "axios";

export type CurrentUser = {
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN" | "EDITOR" | "PREEDITOR";
  informationAboutRole: string[];
};

export type LoadSessionRequest = {
  token: string | null;
};

const loadSession = async ({ token }: LoadSessionRequest) => {
  const currentUser = await axios.get<CurrentUser>("/api/currentUser", {
    headers: { Authorization: token },
  });

  return currentUser.data;
};

export const sessionApi = {
  loadSession,
};
