export type CurrentUser = {
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
};
