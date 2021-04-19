import { combine, createEffect, createEvent, createStore } from "effector";
import { Engine, EngineFilter } from "../api/Engines";

export const getEnginesFx = createEffect<string, Engine[], Error>(
  async (queryParams) => {
    const req = await fetch(`/engines${queryParams}`);
    const data = req.json();
    return data;
  }
);

export const loadMoreEnginesFx = createEffect<string, Engine[], Error>(
  async (queryParams) => {
    const req = await fetch(`/engines${queryParams}`);
    const data = req.json();
    return data;
  }
);

export const $engines = createStore<Engine[]>([])
  .on(getEnginesFx.doneData, (_, engines) => {
    if (engines && engines.length > 0) {
      lastFetchedEngineIdChanged(engines[engines.length - 1].id);
    }

    return engines;
  })
  .on(loadMoreEnginesFx.doneData, (state, payload) => {
    if (payload && payload.length > 0) {
      lastFetchedEngineIdChanged(payload[payload.length - 1].id);
    }

    return [...state, ...payload];
  });

export const engineModelChanged = createEvent<string>();
export const powerRatingChanged = createEvent<number | number[]>();
export const imoEcoStandardChanged = createEvent<string>();
export const epaEcoStandardChanged = createEvent<string>();
export const lastFetchedEngineIdChanged = createEvent<number>();

export const $engineModel = createStore<string>("").on(
  engineModelChanged,
  (_, payload) => payload
);
export const $powerRating = createStore<number | number[]>([2000, 3000]).on(
  powerRatingChanged,
  (_, payload) => payload
);
export const $imoEcoStandardChanged = createStore<string>("").on(
  imoEcoStandardChanged,
  (_, payload) => payload
);
export const $epaEcoStandardChanged = createStore<string>("").on(
  epaEcoStandardChanged,
  (_, payload) => payload
);
export const $lastFetchedEngineId = createStore<number>(0).on(
  lastFetchedEngineIdChanged,
  (_, payload) => payload
);

export const $engineFilter = combine<EngineFilter>({
  model: $engineModel,
  manufacturerName: "",
  powerRating: $powerRating,
  rotationSpeed: 0,
  cylinderQuantity: 0,
  flangeType: "",
  weightDryNoImplements: "",
  length: "",
  width: "",
  height: "",
  imoEcoStandard: $imoEcoStandardChanged,
  epaEcoStandard: $epaEcoStandardChanged,
  euEcoStandard: "",
  uicEcoStandard: "",
  lastFetchedEngineId: $lastFetchedEngineId,
});
