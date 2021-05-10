import { renderRoutes } from "react-router-config";
import { CreateEnginePage } from "./pages/create-and-edit-engine/create-egnine";
import { EngineInfoPage } from "./pages/engine-info";
import { SearchEnginesPage } from "./pages/search-engines";

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
];

export const Routes = () => <>{renderRoutes(routes())}</>;
