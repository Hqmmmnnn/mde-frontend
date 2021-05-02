import { renderRoutes } from "react-router-config";
import { EngineInfoPage } from "./pages/engine_info.tsx";
import { SearchEnginesPage } from "./pages/search_engines";

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
];

export const Routes = () => <>{renderRoutes(routes())}</>;
