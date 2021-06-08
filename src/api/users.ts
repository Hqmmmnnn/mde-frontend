import axios from "axios";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN" | "EDITOR" | "PREEDITOR";
  informationAboutRole: string[];
};

export type UpdateUser = {
  id: number;
  role: string;
};

type UpdateUserRequest = {
  user: UpdateUser;
  token: string | null;
};

type FetchUsersRequest = {
  token: string | null;
};

const fetchUsers = async ({ token }: FetchUsersRequest) => {
  const users = await axios.get<User[]>("/api/users", {
    headers: { Authorization: token },
  });
  return users.data;
};

const updateUser = async ({ user, token }: UpdateUserRequest) => {
  return await axios.patch("/api/users", user, {
    headers: { Authorization: token },
  });
};

export const usersApi = {
  fetchUsers,
  updateUser,
};
