import { renderRoutes } from "react-router-config";
import { MainPage } from "./App";

const routes = () => [
  {
    path: "/",
    exact: true,
    component: MainPage,
  },
];

export const Routes = () => <>{renderRoutes(routes())}</>;
