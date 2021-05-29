import { Box, Button, Grid } from "@material-ui/core";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Facet } from "../../components/facet";
import {
  $engineFilter,
  lastFetchedEngineIdChanged,
  getEnginesFx,
  cylinderQuantityData,
  rotationFrequencyData,
  manufacturersData,
  flangeTypeData,
  imoEcoStandardData,
  epaEcoStandardData,
  euEcoStandardData,
  uicEcoStandardData,
  powerRatingData,
  weightDryNoImplementsData,
  lengthData,
  widthData,
  heightData,
  engineModelReseted,
} from "./model";
import { getQueryParams, getInitialStateFromQueryParams } from "../../lib/get-query-params";
import { CylinderQuantity } from "./cylinder-quantity";
import { EngineDemo } from "./engine-demo";
import { EngineSearch } from "./engine-search";
import { EpaEcoStandard } from "./epa-eco-standard";
import { EuEcoStandard } from "./eu-eco-standard";
import { FlangeTypes } from "./flange-types";
import { ImoEcoStandard } from "./imo-eco-standard";
import { Manufacturers } from "./manufacturers";
import { UicEcoStandard } from "./uic-eco-standards";
import { Header } from "../../features/common/header";

export const SearchEnginesPage = () => (
  <Grid container>
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid item xs={12} container spacing={4} style={{ padding: "24px" }}>
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
        getEnginesFx(history.location.search);
      }}
    >
      Поиск
    </Button>
  );
};

const ResetEngineFilterStateButton = () => {
  const history = useHistory();

  return (
    <Button
      fullWidth
      variant="outlined"
      color="secondary"
      onClick={() => {
        history.replace("/");
        getEnginesFx("");
        engineModelReseted();
        manufacturersData.reset();
        loadAllDataForFilter();
      }}
    >
      Очистить
    </Button>
  );
};

const loadAllDataForFilter = () => {
  return Promise.all([
    cylinderQuantityData.dataFromServerLoaded("/api/filtrationData/cylindersQuantity"),
    rotationFrequencyData.dataFromServerLoaded("/api/filtrationData/rotationFrequencies"),
    manufacturersData.dataFromServerLoaded("/api/filtrationData/manufacturers"),
    flangeTypeData.dataFromServerLoaded("/api/filtrationData/flangeTypes"),
    imoEcoStandardData.dataFromServerLoaded("/api/filtrationData/imoEcoStandards"),
    epaEcoStandardData.dataFromServerLoaded("/api/filtrationData/epaEcoStandards"),
    euEcoStandardData.dataFromServerLoaded("/api/filtrationData/euEcoStandards"),
    uicEcoStandardData.dataFromServerLoaded("/api/filtrationData/uicEcoStandards"),
    powerRatingData.dataFromServerLoaded("/api/filtrationData/powerRatingMinAndMax"),
    weightDryNoImplementsData.dataFromServerLoaded(
      "/api/filtrationData/weightDryNoImplementsMinAndMax"
    ),
  ]).then(() => {
    return Promise.all([
      lengthData.dataFromServerLoaded("/api/filtrationData/lengthMinAndMax"),
      widthData.dataFromServerLoaded("/api/filtrationData/widthMinAndMax"),
      heightData.dataFromServerLoaded("/api/filtrationData/heightMinAndMax"),
    ]);
  });
};

const Aside = () => {
  const search = useLocation().search;

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    loadAllDataForFilter().then(() => getInitialStateFromQueryParams(searchParams));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <EngineSearch />

      <Manufacturers />
      <Facet data={rotationFrequencyData} label="Частота вращения" />
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

      <Box px={2}>
        <Box py={1}>
          <SearchWithFiltersButton />
        </Box>
      </Box>

      <Box px={2}>
        <Box py={1}>
          <ResetEngineFilterStateButton />
        </Box>
      </Box>
    </div>
  );
};
