import { EngineFilter } from "../api/Engines";
import { CheckboxValue } from "../components/checkbox/model";
import { cylinderQuantityData, flangeTypeData } from "../engines_search/model";

export const getQueryParams = (engineFilter: EngineFilter): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(engineFilter)) {
    if (
      key === "flangeTypes" ||
      key === "manufacturerNames" ||
      key === "cylindersQuantity" ||
      key === "rotationSpeed" ||
      key === "imoEcoStandard" ||
      key === "epaEcoStandard" ||
      key === "euEcoStandard" ||
      key === "uicEcoStandard"
    ) {
      const values = value as CheckboxValue[];
      const names = values.filter(({ checked }) => checked).map(({ name }) => name);

      if (names.length) params.append(key, names.join(","));
      else params.delete(key);

      continue;
    }

    if (
      (key === "powerRating" ||
        key === "height" ||
        key === "width" ||
        key === "length" ||
        key === "weightDryNoImplements") &&
      value
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
    if (name === "flangeType") {
      const names = value.split(",");

      if (flangeTypeData.lastStateRestored) {
        flangeTypeData.lastStateRestored(names);
      }

      continue;
    }

    if (name === "cylinderQuantity") {
      const names = value.split(",");

      if (cylinderQuantityData.lastStateRestored) {
        cylinderQuantityData.lastStateRestored(names);
      }

      continue;
    }
  }
};
