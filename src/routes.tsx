import { renderRoutes } from "react-router-config";
import { CreateEngine } from "./pages/create-egnine";
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
    component: CreateEngine,
  },
];

export const Routes = () => <>{renderRoutes(routes())}</>;
