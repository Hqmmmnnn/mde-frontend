import "./App.css";
import { BrowserRouter as Router, useHistory, useLocation } from "react-router-dom";
import { useStore } from "effector-react";
import {
  $engineFilter,
  getEnginesFx,
  lastFetchedEngineIdChanged,
  lengthData,
  widthData,
  heightData,
  weightDryNoImplementsData,
  powerRating,
  flangeTypeData,
  cylinderQuantityData,
  rotationSpeedData,
  manufacturersData,
  imoEcoStandardData,
  epaEcoStandardData,
  euEcoStandardData,
  uicEcoStandardData,
} from "./engines_search/model";
import Button from "@material-ui/core/Button";
import { getInitialStateFromQueryParams, getQueryParams } from "./lib/getQueryParams";
import { EngineSearch } from "./components/engine-search";

import { Facet } from "./components/facet";
import { EngineDemo } from "./components/engine-demo";
import { LoadMoreEnginesButton } from "./components/load-more-engines-button";
import { Routes } from "./routes";
import { CylinderQuantity } from "./components/cylinder-quantity";
import { Manufacturers } from "./components/manufacturers";
import { RotationSpeed } from "./components/rotation-speed";
import { FlangeTypes } from "./components/flange-types";
import { useEffect } from "react";
import { ImoEcoStandard } from "./components/imo-eco-standard";
import { EpaEcoStandard } from "./components/epa-eco-standard";
import { EuEcoStandard } from "./components/eu-eco-standard";
import { UicEcoStandard } from "./components/uic-eco-standards";

const Btn = () => {
  const engineFilter = useStore($engineFilter);
  const history = useHistory();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        const params = getQueryParams(engineFilter);
        lastFetchedEngineIdChanged(0);
        params.delete("lastFetchedEngineId");
        history.push({ search: params.toString().replaceAll("%2C", ",") });
        return getEnginesFx(history.location.search);
      }}
    >
      Поиск
    </Button>
  );
};

const Aside = () => {
  const search = useLocation().search;

  useEffect(() => {
    const searchParams = new URLSearchParams(search);

    Promise.all([
      cylinderQuantityData.dataFromServerLoaded("/cylindersQuantity"),
      rotationSpeedData.dataFromServerLoaded("/rotationSpeed"),
      manufacturersData.dataFromServerLoaded("/manufacturers"),
      flangeTypeData.dataFromServerLoaded("/flangeTypes"),
      imoEcoStandardData.dataFromServerLoaded("/imoEcoStandards"),
      epaEcoStandardData.dataFromServerLoaded("/epaEcoStandards"),
      euEcoStandardData.dataFromServerLoaded("/euEcoStandards"),
      uicEcoStandardData.dataFromServerLoaded("/uicEcoStandards"),
    ]).then(() => {
      getInitialStateFromQueryParams(searchParams);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <EngineSearch />

      <Manufacturers />
      <RotationSpeed />
      <FlangeTypes />
      <CylinderQuantity />

      <ImoEcoStandard />
      <EpaEcoStandard />
      <EuEcoStandard />
      <UicEcoStandard />

      <Facet data={powerRating} label="Мощность двигателя" />
      <Facet data={weightDryNoImplementsData} label="Вес без оборудования" />
      <Facet data={lengthData} label="Длина" />
      <Facet data={widthData} label="Ширина" />
      <Facet data={heightData} label="Высота" />
      <Btn />
    </div>
  );
};

export const MainPage = () => (
  <div className="wrapper">
    <header className="header">header</header>
    <aside className="aside">
      <Aside />
    </aside>
    <main className="main">
      <EngineDemo />
      <LoadMoreEnginesButton />
    </main>
    <footer className="footer">footer</footer>
  </div>
);

function App() {
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
