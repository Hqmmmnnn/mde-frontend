import { combine, createEffect, createEvent, createStore, Store } from "effector";
import { Engine, EngineFilter } from "../api/Engines";
import { cylinderQuantityInitialValue } from "../components/cylinderQuantity";
import { flangeTypeInitialState } from "../components/flangeType";
import { manufacturersInitialValue } from "../components/manufacturers";
import { rotationSpeedInitialState } from "../components/rotation-speed";

export const getEnginesFx = createEffect<string, Engine[], Error>(async (queryParams) => {
  const req = await fetch(`/engines${queryParams}`);
  const data = req.json();
  return data;
});

export const loadMoreEnginesFx = createEffect<string, Engine[], Error>(async (queryParams) => {
  const req = await fetch(`/engines${queryParams}`);
  const data = req.json();
  return data;
});

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
export const lastFetchedEngineIdChanged = createEvent<number>();

const getEcoStandardData = (initialState: string) => {
  const ecoStanardChanged = createEvent<string>();

  const $ecoStanard = createStore<string>(initialState).on(
    ecoStanardChanged,
    (_, payload) => payload
  );

  const handleEcoStanardChange = (e: any) => {
    ecoStanardChanged(e.target.value);
  };

  return {
    $ecoStanard,
    handleEcoStanardChange,
  };
};

export const imoEcoStandardData = getEcoStandardData("");
export const epaEcoStandardData = getEcoStandardData("");
export const euEcoStandardData = getEcoStandardData("");
export const uicEcoStandardData = getEcoStandardData("");

const $engineModel = createStore<string>("").on(engineModelChanged, (_, payload) => payload);
const $lastFetchedEngineId = createStore<number>(0).on(
  lastFetchedEngineIdChanged,
  (_, payload) => payload
);

export type FacetValue = {
  from: number;
  to: number;
};

export const getFacetData = (initialState: FacetValue) => {
  const facetFromChanged = createEvent<number>();
  const facetToChanged = createEvent<number>();
  const facetFromToChanged = createEvent<FacetValue>();

  const handleFromToChange = (e: any, newValue: any) => {
    facetFromToChanged({ from: newValue[0], to: newValue[1] });
  };

  const handleFromChange = (e: any) => {
    facetFromChanged(e.target.value);
  };

  const handleToChange = (e: any) => {
    facetToChanged(e.target.value);
  };

  const $facetStore = createStore<FacetValue>(initialState)
    .on(facetFromChanged, ({ to }, payload) => ({
      from: payload,
      to,
    }))
    .on(facetToChanged, ({ from }, payload) => ({
      from,
      to: payload,
    }))
    .on(facetFromToChanged, (_, payload) => payload);

  return {
    handleFromChange,
    handleToChange,
    handleFromToChange,
    $facetStore,
  };
};

export type FacetData = {
  handleFromChange: (e: any) => void;
  handleToChange: (e: any) => void;
  handleFromToChange: (e: any, newValue: any) => void;
  $facetStore: Store<FacetValue>;
};

export const powerRating: FacetData = getFacetData({ from: 1000, to: 2000 });
export const lengthData: FacetData = getFacetData({ from: 2000, to: 3000 });
export const widthData: FacetData = getFacetData({ from: 2000, to: 4000 });
export const heightData: FacetData = getFacetData({ from: 2000, to: 4000 });
export const weightDryNoImplementsData: FacetData = getFacetData({
  from: 3000,
  to: 5000,
});

export const getCheckBoxData = function <T>(initialState: T) {
  const checkBoxChanged = createEvent<{ name: string; value: boolean }>();

  const handleCheckBoxChange = checkBoxChanged.prepend((e: any) => ({
    name: e.target.name,
    value: e.target.checked,
  }));

  const $store = createStore<T>(initialState).on(
    checkBoxChanged,
    (state, { name, value }: { name: string; value: boolean }) => {
      return {
        ...state,
        [name]: value,
      };
    }
  );

  return { $store, handleCheckBoxChange };
};

export const manufacturersData = getCheckBoxData(manufacturersInitialValue);
export const rotationSpeedData = getCheckBoxData(rotationSpeedInitialState);
export const cylinderQuantityData = getCheckBoxData(cylinderQuantityInitialValue);
export const flangeTypeData = getCheckBoxData(flangeTypeInitialState);

export const $engineFilter = combine<EngineFilter>({
  model: $engineModel,
  manufacturerName: manufacturersData.$store,
  powerRating: powerRating.$facetStore,
  rotationSpeed: rotationSpeedData.$store,
  cylinderQuantity: cylinderQuantityData.$store,
  flangeType: flangeTypeData.$store,
  weightDryNoImplements: weightDryNoImplementsData.$facetStore,
  length: lengthData.$facetStore,
  width: widthData.$facetStore,
  height: heightData.$facetStore,
  imoEcoStandard: imoEcoStandardData.$ecoStanard,
  epaEcoStandard: epaEcoStandardData.$ecoStanard,
  euEcoStandard: euEcoStandardData.$ecoStanard,
  uicEcoStandard: uicEcoStandardData.$ecoStanard,
  lastFetchedEngineId: $lastFetchedEngineId,
});
