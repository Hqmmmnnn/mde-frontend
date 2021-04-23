import { EngineFilter } from "../api/Engines";

export const getQueryParams = (engineFilter: EngineFilter): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(engineFilter)) {
    if (key === "flangeType" || key === "cylinderQuantity") {
      const query = getQueryParamsFromCheckbox(value);
      if (query) {
        params.append(key, query);
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
      params.append(key, `${value.from}-${value.to}`);
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

const getQueryParamsFromCheckbox = (state: any): string => {
  let query = [];

  console.log("state " + state);
  for (const [key, value] of Object.entries(state)) {
    console.log("key " + key);
    console.log("value " + value);
    if (value) query.push(key);
  }

  return query.join("-");
};
