import { renderRoutes } from "react-router-config";
import { CreateEnginePage } from "./pages/create-and-edit-engine/create-egnine";
import { EditEnginePage } from "./pages/create-and-edit-engine/edit-engine";
import { EngineInfoPage } from "./pages/engine-info";
import { SearchEnginesPage } from "./pages/search-engines";
import { UsersPage } from "./pages/users";

const routes = () => [
  {
    path: "/",
    exact: true,
    component: SearchEnginesPage,
  },
  {
    path: "/engines/:id",
    exact: true,
    component: EngineInfoPage,
  },
  {
    path: "/createEngine",
    exact: true,
    component: CreateEnginePage,
  },
  {
    path: "/editEngine/:id",
    exact: true,
    component: EditEnginePage,
  },
  {
    path: "/users",
    exact: true,
    component: UsersPage,
  },
];

export const Routes = () => <>{renderRoutes(routes())}</>;
