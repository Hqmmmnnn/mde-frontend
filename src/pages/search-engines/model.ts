import axios from "axios";
import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  Effect,
  Event,
  forward,
  sample,
  Store,
} from "effector";
import { History } from "history";
import {
  EngineFilter,
  enginesApi,
  DownloadEngineInCSVRequest,
  FetchEngineDataRequest,
  EditEngine,
  DeleteEngineRequest,
  EnginesDemo,
} from "../../api/engines";
import { getCheckboxData, getCheckboxWithSearchData } from "../../components/checkbox/model";
import { $token } from "../../features/common/token-model";
import { getQueryParams } from "../../lib/get-query-params";
import { newEngineForm } from "../create-and-edit-engine/create-egnine/create-engine-model";

export const downloadEngineInCSVFx = createEffect<DownloadEngineInCSVRequest, void, Error>(
  enginesApi.downloadEngineInCSV
);

export const downloadEngineInCSVByConditionFx = createEffect<string, void, Error>(
  enginesApi.downloadEngineInCSVByCondition
);

const loadEngineDataForCreateFx = createEffect<FetchEngineDataRequest, EditEngine, Error>(
  enginesApi.fetchEngineData
);

export const loadEngineDataForCreateFxWithToken = attach({
  effect: loadEngineDataForCreateFx,
  source: $token,
  mapParams: (engineId: number, token: string | null) => ({ engineId, token }),
});

forward({
  from: loadEngineDataForCreateFxWithToken.doneData,
  to: newEngineForm.setForm,
});

export const deleteEngineModalOpened = createEvent<void>();
export const deleteEngineModalClosed = createEvent<void>();
export const currentEngineIdForDeleteChanged = createEvent<number>();

export const $currentEngineIdForDelete = createStore<number>(0).on(
  currentEngineIdForDeleteChanged,
  (_, id) => id
);

export const $deleteEngineModal = createStore<boolean>(false)
  .on(deleteEngineModalOpened, () => true)
  .on(deleteEngineModalClosed, () => false);

const deleteEngineFx = createEffect<DeleteEngineRequest, number, Error>(enginesApi.deleteEngine);

export const deleteEngineFxWithToken = attach({
  effect: deleteEngineFx,
  source: $token,
  mapParams: (engineId: number, token: string | null) => ({ engineId, token }),
});

export const getEnginesFx = createEffect<string, EnginesDemo, Error>(enginesApi.fetchEngines);

const enginesInitialState: EnginesDemo = {
  totalPages: 0,
  engines: [],
};

export const $engines = createStore<EnginesDemo>(enginesInitialState)
  .on(getEnginesFx.doneData, (_, engines) => engines)
  .on(deleteEngineFx.doneData, (enginesDemo, deletedEngineId) => ({
    ...enginesDemo,
    engines: enginesDemo.engines.filter((engine) => engine.id !== deletedEngineId),
  }));

export const engineModelChanged = createEvent<string>();
export const engineModelReseted = createEvent<void>();
export const $engineModel = createStore<string>("")
  .on(engineModelChanged, (_, payload) => payload)
  .reset(engineModelReseted);

export const currentPageChanged = createEvent<number>();
export const $currentPage = createStore<number>(1).on(currentPageChanged, (_, page) => page);

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

export const rotationFrequencyData = getFacetData({ from: 0, to: 0, checked: false });
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
export const manufacturersData = getCheckboxWithSearchData([]);

export const $engineFilter = combine<EngineFilter>({
  model: $engineModel,
  manufacturerNames: manufacturersData.$checkboxes,
  powerRating: powerRatingData.$facetStore,
  rotationFrequencies: rotationFrequencyData.$facetStore,
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
  currentPage: $currentPage,
});

export const searchParamsChanged = createEvent<History<unknown>>();

sample({
  clock: searchParamsChanged,
  source: $engineFilter,
  fn: (filterData, history) => {
    const params = getQueryParams(filterData);
    history.push({ search: params.toString().replaceAll("%2C", ",") });
    return history.location.search;
  },
  target: getEnginesFx,
});
