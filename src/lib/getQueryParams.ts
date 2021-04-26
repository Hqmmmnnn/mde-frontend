import { EngineFilter } from "../api/Engines";
import { CheckboxProps } from "../components/checkbox/model";
import { cylinderQuantityData, flangeTypeData } from "../engines_search/model";

export const getQueryParams = (engineFilter: EngineFilter): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(engineFilter)) {
    if (
      key === "flangeType" ||
      key === "manufacturerNames" ||
      key === "cylinderQuantity" ||
      key === "rotationSpeed"
    ) {
      const values = <CheckboxProps[]>value;

      const names = values.filter(({ checked }) => checked).map(({ name }) => name);

      if (names.length) {
        params.append(key, names.join(","));
      } else {
        params.delete(key);
      }

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
  let model = "";

  console.log("getInitialStateFromQueryParams");
  for (let [name, value] of search.entries()) {
    if (name === "model") {
      model = value;
      continue;
    }

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
