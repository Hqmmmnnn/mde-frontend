import axios from "axios";
import { Effect, Store } from "effector";
import { CheckboxValue } from "../components/checkbox/model";
import { SelectData } from "../pages/create-and-edit-engine/common/model";
import { FacetValue } from "../pages/search-engines/model";

export interface EnginesDemo {
  totalPages: number;
  engines: EngineDemo[];
}

export interface EngineDemo {
  id: number;
  model: string;
  series: string;
  powerRating: number;
  rotationFrequency: string;
  manufacturerName: string;
  cylinderQuantity: number;
  cylinderDiameter: string;
  length: string;
  width: string;
  height: string;
  pistonStroke: string;
  imoEcoStandard: string;
  epaEcoStandard: string;
  euEcoStandard: string;
  uicEcoStandard: string;
  image: string;
}

export interface Engine {
  id: number;
  model: string;
  powerRating: number;
  rotationFrequency: number;
  manufacturerName: string;
  torqueMax: number;
  assignment: string;
  loadMode: string;
  flangeType: string;
  operatingTimeYear: number;
  operatingTimeFirstTs: number;
  operatingTimeToRepair: number;
  fuelRate: number;
  fuelRateNominalPower: number;
  cylinderWorkingVolume: number;
  cylinderQuantity: number;
  cylinderDiameter: number;
  pistonStroke: number;
  compressionRatio: number;
  cylinderMaxPressure: number;
  cylinderArrangement: string;
  cylinderDegrees: number;
  injectionType: string;
  injectionPressure: number;
  length: number;
  width: number;
  height: number;
  weightDryNoImplements: number;
  weightWithImplements: number;
  coolingSystemType: string;
  coolingSystemVolume: number;
  oilRate: number;
  oilSystemVolume: string;
  imoEcoStandard: string;
  epaEcoStandard: string;
  euEcoStandard: string;
  uicEcoStandard: string;
  vesselType: string;
  classificationSociety: string;
  image: string;
}

export interface EngineFilter {
  model: string;
  manufacturerNames: CheckboxValue[];
  powerRating: FacetValue;
  rotationFrequencies: FacetValue;
  cylindersQuantity: CheckboxValue[];
  flangeTypes: CheckboxValue[];
  weightDryNoImplements: FacetValue;
  length: FacetValue;
  width: FacetValue;
  height: FacetValue;
  imoEcoStandards: CheckboxValue[];
  epaEcoStandards: CheckboxValue[];
  euEcoStandards: CheckboxValue[];
  uicEcoStandards: CheckboxValue[];
  currentPage: number;
}

export type EditEngine = Omit<SaveEngine, "files" | "image"> & { engineId: string };

export type FetchEngineDataRequest = {
  engineId: number;
  token: string | null;
};

const fetchEngineData = async ({ engineId, token }: FetchEngineDataRequest) => {
  var editEngine = await axios.get<EditEngine>(`/api/editEngine/${engineId}`, {
    headers: { Authorization: token },
  });

  const data = editEngine.data as any;

  for (const key in data) {
    if (data[key] === null) {
      data[key] = "";
    }
  }

  return data;
};

type EngineInfoRow = {
  name: string;
  value: number | string | boolean;
};

export type EngineInfoTable = {
  name: string;
  rows: EngineInfoRow[];
};

const fetchEngine = async (engineId: string) => {
  const engineData = await axios.get<EngineInfoTable[]>(`/api/engines/${engineId}`);
  return engineData.data;
};

const fetchEngines = async (searchParams: string) => {
  const res = await axios.get(`/api/engines${searchParams}`);
  return res.data;
};

export type SaveEngine = {
  manufacturerId: string;
  series: string;
  model: string;
  assignmentId: string;
  engineRatingId: string;
  operatingTimeYear: string;
  operatingTimeFirstTs: string;
  operatingTimeToRepair: string;
  powerRating: string;
  rotationFrequency: string;
  torqueMax: string;
  fuelRate: string;
  fuelRateNominalPower: string;
  cylinderWorkingVolume: string;
  cylinderQuantityId: string;
  cylinderDiameter: string;
  pistonStroke: string;
  compressionRatio: string;
  injectionTypeId: string;
  injectionPressure: string;
  cylinderMaxPressure: string;
  cylinderArrangementId: string;
  cylinderDegrees: string;
  weightDryNoImplements: string;
  weightWithImplements: string;
  coolingSystemTypeId: string;
  length: string;
  width: string;
  height: string;
  oilRate: string;
  oilSystemVolume: string;
  coolingSystemVolume: string;
  imoEcoStandardId: string;
  epaEcoStandardId: string;
  euEcoStandardId: string;
  uicEcoStandardId: string;
  vesselTypeId: string;
  classificationSocietyId: string;
  flangeId: string;
  note: string;
  files: File[] | null;
  image: File | null;
};

export type SaveEngineReqest = {
  data: SaveEngine;
  token: string | null;
};

const saveEngine = async ({ data, token }: SaveEngineReqest) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Array) {
      if (value) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]);
        }

        continue;
      }
    }

    if (value) formData.append(key, value);
  }

  return axios.post("/api/engines", formData, { headers: { Authorization: token } });
};

export type EditEngineRequest = {
  data: EditEngine;
  token: string | null;
};

const editEngine = async ({ data, token }: EditEngineRequest) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      formData.append(key, value);
    }
  }

  return axios.put("/api/engines", formData, { headers: { Authorization: token } });
};

export type DeleteEngineRequest = {
  engineId: number;
  token: string | null;
};

const deleteEngine = async ({ engineId, token }: DeleteEngineRequest) => {
  await axios.delete(`/api/engines/${engineId}`, { headers: { Authorization: token } });
  return engineId;
};

export type DownloadEngineInCSVRequest = {
  engineId: number;
  engineModel: string;
};

export type FetchSelectedDataRequest = {
  url: string;
  token: string | null;
};

export type SelectedDataProps = {
  loadSelectDataFxWithToken: Effect<string, SelectData[], Error>;
  $selectedData: Store<SelectData[]>;
};

const fetchSelectedData = async ({ url, token }: FetchSelectedDataRequest) => {
  const { data } = await axios.get<SelectData[]>(url, {
    headers: { Authorization: token },
  });
  return data;
};

const downloadEngineInCSV = async (req: DownloadEngineInCSVRequest) => {
  axios.get(`/api/download/csv/${req.engineId}`, { responseType: "blob" }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", req.engineModel + ".csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

const downloadEngineInCSVByCondition = async (searchParams: string) => {
  axios.get(`/api/download/csv/engines${searchParams}`, { responseType: "blob" }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    var date = new Date();
    var datetime =
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear() +
      " " +
      date.getHours() +
      "-" +
      date.getMinutes() +
      "-" +
      date.getSeconds();

    console.log(datetime);

    link.setAttribute("download", "Выборка двигателей от " + datetime.toString() + ".csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

export const enginesApi = {
  fetchEngines,
  fetchEngine,
  fetchEngineData,
  fetchSelectedData,
  saveEngine,
  editEngine,
  deleteEngine,
  downloadEngineInCSV,
  downloadEngineInCSVByCondition,
};
