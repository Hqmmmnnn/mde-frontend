import { EngineFilter } from "../api/engines";
import { CheckboxValue } from "../components/checkbox/model";
import {
  cylinderQuantityData,
  epaEcoStandardData,
  euEcoStandardData,
  flangeTypeData,
  imoEcoStandardData,
  manufacturersData,
  rotationFrequencyData,
  uicEcoStandardData,
  powerRatingData,
  weightDryNoImplementsData,
  lengthData,
  widthData,
  heightData,
  engineModelLastStateRestored,
} from "../pages/search-engines/model";

export const getQueryParams = (engineFilter: EngineFilter): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(engineFilter)) {
    if (
      key === "flangeTypes" ||
      key === "manufacturerNames" ||
      key === "cylindersQuantity" ||
      key === "imoEcoStandards" ||
      key === "epaEcoStandards" ||
      key === "euEcoStandards" ||
      key === "uicEcoStandards"
    ) {
      const values = value as CheckboxValue[];
      const names = values.filter(({ checked }) => checked).map(({ name }) => name);

      if (names.length) params.append(key, names.join(","));
      else params.delete(key);

      continue;
    }

    if (
      key === "rotationFrequencies" ||
      key === "powerRating" ||
      key === "height" ||
      key === "width" ||
      key === "length" ||
      key === "weightDryNoImplements"
    ) {
      if (value.checked === true) {
        params.append(key, `${value.from}-${value.to}`);
      }

      continue;
    }

    if (value) {
      params.append(key, value);
    } else {
      params.delete(key);
    }
  }

  return params;
};

export const getInitialStateFromQueryParams = (search: URLSearchParams) => {
  for (let [name, value] of search.entries()) {
    if (name === "model") {
      engineModelLastStateRestored(value);
      continue;
    }

    if (name === "flangeTypes") {
      const names = value.split(",");
      flangeTypeData.lastStateRestored(names);
      continue;
    }

    if (name === "cylindersQuantity") {
      const names = value.split(",");
      cylinderQuantityData.lastStateRestored(names);
      continue;
    }

    if (name === "manufacturerNames") {
      const names = value.split(",");
      manufacturersData.lastStateRestored(names);
      continue;
    }

    if (name === "imoEcoStandards") {
      const names = value.split(",");
      imoEcoStandardData.lastStateRestored(names);
      continue;
    }

    if (name === "epaEcoStandards") {
      const names = value.split(",");
      epaEcoStandardData.lastStateRestored(names);
      continue;
    }

    if (name === "euEcoStandards") {
      const names = value.split(",");
      euEcoStandardData.lastStateRestored(names);
      continue;
    }

    if (name === "uicEcoStandards") {
      const names = value.split(",");
      uicEcoStandardData.lastStateRestored(names);
      continue;
    }

    if (name === "rotationFrequencies") {
      const range = value.split("-").map((v) => Number(v));
      rotationFrequencyData.loadStateRestored({ from: range[0], to: range[1] });
      continue;
    }

    if (name === "powerRating") {
      const range = value.split("-").map((v) => Number(v));
      powerRatingData.loadStateRestored({ from: range[0], to: range[1] });
      continue;
    }

    if (name === "weightDryNoImplements") {
      const range = value.split("-").map((v) => Number(v));
      weightDryNoImplementsData.loadStateRestored({ from: range[0], to: range[1] });
      continue;
    }

    if (name === "length") {
      const range = value.split("-").map((v) => Number(v));
      lengthData.loadStateRestored({ from: range[0], to: range[1] });
      continue;
    }

    if (name === "width") {
      const range = value.split("-").map((v) => Number(v));
      widthData.loadStateRestored({ from: range[0], to: range[1] });
      continue;
    }

    if (name === "height") {
      const range = value.split("-").map((v) => Number(v));
      heightData.loadStateRestored({ from: range[0], to: range[1] });
      continue;
    }
  }
};
