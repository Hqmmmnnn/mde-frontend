import { Signup } from "./auth/signup";
import { renderRoutes } from "react-router-config";
import { MainPage } from "./App";

const routes = () => [
  {
    path: "/",
    exact: true,
    component: MainPage,
  },

  {
    path: "/signup",
    exact: true,
    component: Signup,
  },
];

export const Routes = () => <>{renderRoutes(routes())}</>;
