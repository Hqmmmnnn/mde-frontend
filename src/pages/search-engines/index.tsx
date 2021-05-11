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
import { RotationFrequency } from "./rotation-frequency";
import { UicEcoStandard } from "./uic-eco-standards";
import { Header } from "../../components/header";

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
      rotationFrequencyData.dataFromServerLoaded("/rotationFrequencies"),
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
      <RotationFrequency />
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
    </div>
  );
};
