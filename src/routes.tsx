import { RegisterPage } from "./auth/register";
import { renderRoutes } from "react-router-config";
import { MainPage } from "./App";
import { LoginPage } from "./auth/login";

const routes = () => [
  {
    path: "/",
    exact: true,
    component: MainPage,
  },
  {
    path: "/register",
    exact: true,
    component: RegisterPage,
  },
  {
    path: "/login",
    exact: true,
    component: LoginPage,
  },
];

export const Routes = () => <>{renderRoutes(routes())}</>;
