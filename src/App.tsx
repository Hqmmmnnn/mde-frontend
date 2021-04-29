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
  powerRatingData,
  flangeTypeData,
  cylinderQuantityData,
  rotationSpeedData,
  manufacturersData,
  imoEcoStandardData,
  epaEcoStandardData,
  euEcoStandardData,
  uicEcoStandardData,
  filterResetTriggered,
} from "./engines_search/model";
import Button from "@material-ui/core/Button";
import { getInitialStateFromQueryParams, getQueryParams } from "./lib/getQueryParams";
import { EngineSearch } from "./components/engine-search";

import { Facet } from "./components/facet";
import { EngineDemo } from "./components/engine-demo";
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
import { Header } from "./components/header";
import { Grid, Box } from "@material-ui/core";
import { AccountLoader } from "./lib/accout-loader";

const SearchWithFiltersButton = () => {
  const engineFilter = useStore($engineFilter);
  const history = useHistory();

  return (
    <Button
      fullWidth
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

const ResetFilterButton = () => {
  return (
    <Button
      onClick={() => filterResetTriggered()}
      variant="outlined"
      color="secondary"
      style={{ margin: "16px 0" }}
    >
      Сбросить фильтр
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
      powerRatingData.dataFromServerLoaded("/powerRatingMinAndMax"),
      weightDryNoImplementsData.dataFromServerLoaded("/weightDryNoImplementsMinAndMax"),
    ]).then(() => {
      Promise.all([
        lengthData.dataFromServerLoaded("/lengthMinAndMax"),
        widthData.dataFromServerLoaded("/widthMinAndMax"),
        heightData.dataFromServerLoaded("/heightMinAndMax"),
      ]).then(() => {
        getInitialStateFromQueryParams(searchParams);
      });
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

      <Facet data={powerRatingData} label="Мощность двигателя" />
      <Facet data={weightDryNoImplementsData} label="Вес без оборудования" />
      <Facet data={lengthData} label="Длина" />
      <Facet data={widthData} label="Ширина" />
      <Facet data={heightData} label="Высота" />

      <SearchWithFiltersButton />
      <ResetFilterButton />
    </div>
  );
};

export const MainPage = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid item xs={12} container spacing={4}>
      <Grid item xs={12} sm={12} md={3}>
        <Box paddingLeft={2}>
          <Aside />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={9}>
        <EngineDemo />
      </Grid>
    </Grid>
  </Grid>
);

function App() {
  return (
    <>
      <Router>
        <AccountLoader>
          <Routes />
        </AccountLoader>
      </Router>
    </>
  );
}

export default App;
