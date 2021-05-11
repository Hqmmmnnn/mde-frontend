import axios from "axios";
import { combine, createEffect, createEvent, createStore, Effect, Event, Store } from "effector";
import { EngineDemo, EngineFilter } from "../../api/Engines";
import { getCheckboxData, getCheckboxWithSearchData } from "../../components/checkbox/model";

export const getEnginesFx = createEffect<string, EngineDemo[], Error>(async (queryParams) => {
  const req = await fetch(`/engines${queryParams}`);
  const data = req.json();
  return data;
});

export const loadMoreEnginesFx = createEffect<string, EngineDemo[], Error>(async (queryParams) => {
  const req = await fetch(`/engines${queryParams}`);
  const data = req.json();
  return data;
});

export const $engines = createStore<EngineDemo[]>([])
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

export const engineModelLastStateRestored = createEvent<string>();
export const $engineModel = createStore<string>("")
  .on(engineModelChanged, (_, payload) => payload)
  .on(engineModelLastStateRestored, (_, payload) => payload);

const $lastFetchedEngineId = createStore<number>(0).on(
  lastFetchedEngineIdChanged,
  (_, payload) => payload
);

export type FacetValue = {
  from: number;
  to: number;
  checked: boolean;
};

type FacetDataFromServer = Omit<FacetValue, "checked">;

export type FacetData = {
  handleFromChange: (e: any) => void;
  handleToChange: (e: any) => void;
  handleFromToChange: (e: any, newValue: any) => void;
  loadStateRestored: Event<Omit<FacetValue, "checked">>;
  dataFromServerLoaded: Effect<string, FacetDataFromServer, Error>;
  $facetStore: Store<FacetValue>;
  $initialStateFromServer: Store<FacetDataFromServer>;
};

export const getFacetData = (initialState: FacetValue): FacetData => {
  const facetFromChanged = createEvent<number>();
  const facetToChanged = createEvent<number>();
  const facetFromToChanged = createEvent<FacetValue>();
  const loadStateRestored = createEvent<Omit<FacetValue, "checked">>();
  const dataFromServerLoaded = createEffect<string, FacetDataFromServer, Error>(async (url) => {
    const json = await axios.get<FacetDataFromServer>(url);
    return json.data;
  });

  const handleFromToChange = (e: any, newValue: any) => {
    facetFromToChanged({ from: newValue[0], to: newValue[1], checked: true });
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
      checked: true,
    }))
    .on(facetToChanged, ({ from }, payload) => ({
      from,
      to: payload,
      checked: true,
    }))
    .on(facetFromToChanged, (_, payload) => payload)
    .on(loadStateRestored, (_, payload) => ({
      from: payload.from,
      to: payload.to,
      checked: true,
    }))
    .on(dataFromServerLoaded.doneData, (_, { from, to }) => ({ from, to, checked: false }));

  const $initialStateFromServer = createStore<FacetDataFromServer>(initialState).on(
    dataFromServerLoaded.doneData,
    (_, { from, to }) => ({ from, to })
  );

  return {
    handleFromChange,
    handleToChange,
    handleFromToChange,
    dataFromServerLoaded,
    loadStateRestored,
    $facetStore,
    $initialStateFromServer,
  };
};

export const weightDryNoImplementsData = getFacetData({ from: 0, to: 0, checked: false });
export const powerRatingData = getFacetData({ from: 0, to: 0, checked: false });
export const lengthData = getFacetData({ from: 0, to: 0, checked: false });
export const widthData = getFacetData({ from: 0, to: 0, checked: false });
export const heightData = getFacetData({ from: 0, to: 0, checked: false });

export const imoEcoStandardData = getCheckboxData([]);
export const epaEcoStandardData = getCheckboxData([]);
export const euEcoStandardData = getCheckboxData([]);
export const uicEcoStandardData = getCheckboxData([]);
export const flangeTypeData = getCheckboxData([]);
export const cylinderQuantityData = getCheckboxData([]);
export const rotationFrequencyData = getCheckboxWithSearchData([]);
export const manufacturersData = getCheckboxWithSearchData([]);

export const $engineFilter = combine<EngineFilter>({
  model: $engineModel,
  manufacturerNames: manufacturersData.$checkboxes,
  powerRating: powerRatingData.$facetStore,
  rotationFrequencies: rotationFrequencyData.$checkboxes,
  cylindersQuantity: cylinderQuantityData.$checkboxes,
  flangeTypes: flangeTypeData.$checkboxes,
  weightDryNoImplements: weightDryNoImplementsData.$facetStore,
  length: lengthData.$facetStore,
  width: widthData.$facetStore,
  height: heightData.$facetStore,
  imoEcoStandards: imoEcoStandardData.$checkboxes,
  epaEcoStandards: epaEcoStandardData.$checkboxes,
  euEcoStandards: euEcoStandardData.$checkboxes,
  uicEcoStandards: uicEcoStandardData.$checkboxes,
  lastFetchedEngineId: $lastFetchedEngineId,
});
