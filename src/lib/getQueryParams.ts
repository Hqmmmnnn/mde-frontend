import { EngineFilter } from "../api/Engines";

export const getQueryParams = (engineFilter: EngineFilter): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(engineFilter)) {
    if (key === "powerRating" && value) {
      params.append(key, `${value[0]}-${value[1]}`);
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
