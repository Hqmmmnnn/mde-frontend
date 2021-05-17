import axios from "axios";
import { createEffect, createStore, forward } from "effector";
import { EditEngine } from "../../../api/Engines";
import { createForm } from "effector-forms/dist";
import { EngineFileName } from "../../../api/Files";

type SaveEngineFilesReqest = {
  engineId: string;
  files: File[];
};

export const saveEngineFilesFx = createEffect<SaveEngineFilesReqest, EngineFileName[], Error>(
  async (req) => {
    const formData = new FormData();
    req.files.forEach((file) => formData.append("files", file));
    const files = await axios.post<EngineFileName[]>(`/filenames/${req.engineId}`, formData);
    return files.data;
  }
);

export const deleteEngineFileFx = createEffect<string, string, Error>(async (fileId) => {
  await axios.delete(`/filenames/${fileId}`);
  return fileId;
});

export const getFilesFx = createEffect<string, EngineFileName[], Error>(async (engineId) => {
  const filenames = await axios.get<EngineFileName[]>(`/filenames/${engineId}`);
  return filenames.data;
});

export const $editEngineFiles = createStore<EngineFileName[]>([])
  .on(getFilesFx.doneData, (_, files) => files)
  .on(saveEngineFilesFx.doneData, (state, payload) => [...state, ...payload])
  .on(deleteEngineFileFx.doneData, (state, fileId) => state.filter(({ id }) => id !== fileId));

type SaveEngineImageReqest = {
  engineId: string;
  image: File;
};

export const deleteEngineImageFx = createEffect<string, void, Error>(async (engineId) => {
  await axios.delete(`/images/${engineId}`);
});

export const saveEngineImageFx = createEffect<SaveEngineImageReqest, void, Error>(async (req) => {
  const formData = new FormData();
  formData.append("image", req.image);
  axios.post(`/images/${req.engineId}`, formData);
});

export const getEngineImageFx = createEffect<string, Blob, Error>(async (engineId) => {
  const blob = await axios.get<Blob>(`/images/${engineId}`, { responseType: "blob" });
  return blob.data;
});

export const $engineImage = createStore("")
  .on(getEngineImageFx.doneData, (_, blob) => URL.createObjectURL(blob))
  .on(getEngineImageFx.failData, (_, __) => "")
  .reset(deleteEngineImageFx.done);

export const $isEngineImageExist = $engineImage.map((img) => img !== "");

const editEngineFx = createEffect<EditEngine, void, Error>(async (editEngineFormData) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(editEngineFormData))
    if (value) formData.append(key, value);

  axios({ method: "PUT", url: "/engines", data: formData });
});

export const editEngineForm = createForm({
  fields: {
    engineId: {
      init: "" as string,
    },
    manufacturerId: {
      init: "" as string,
    },
    series: {
      init: "" as string,
    },
    model: {
      init: "" as string,
    },
    assignmentId: {
      init: "" as string,
    },
    engineRatingId: {
      init: "" as string,
    },
    operatingTimeYear: {
      init: "" as string,
    },
    operatingTimeFirstTs: {
      init: "" as string,
    },
    operatingTimeToRepair: {
      init: "" as string,
    },
    powerRating: {
      init: "" as string,
    },
    rotationFrequency: {
      init: "" as string,
    },
    torqueMax: {
      init: "" as string,
    },
    fuelRate: {
      init: "" as string,
    },
    fuelRateNominalPower: {
      init: "" as string,
    },
    cylinderWorkingVolume: {
      init: "" as string,
    },
    cylinderQuantityId: {
      init: "" as string,
    },
    cylinderDiameter: {
      init: "" as string,
    },
    pistonStroke: {
      init: "" as string,
    },
    compressionRatio: {
      init: "" as string,
    },
    injectionTypeId: {
      init: "" as string,
    },
    injectionPressure: {
      init: "" as string,
    },
    cylinderMaxPressure: {
      init: "" as string,
    },
    cylinderArrangementId: {
      init: "" as string,
    },
    cylinderDegrees: {
      init: "" as string,
    },
    weightDryNoImplements: {
      init: "" as string,
    },
    weightWithImplements: {
      init: "" as string,
    },
    coolingSystemTypeId: {
      init: "" as string,
    },
    length: {
      init: "" as string,
    },
    width: {
      init: "" as string,
    },
    height: {
      init: "" as string,
    },
    oilRate: {
      init: "" as string,
    },
    oilSystemVolume: {
      init: "" as string,
    },
    coolingSystemVolume: {
      init: "" as string,
    },
    imoEcoStandardId: {
      init: "" as string,
    },
    epaEcoStandardId: {
      init: "" as string,
    },
    euEcoStandardId: {
      init: "" as string,
    },
    uicEcoStandardId: {
      init: "" as string,
    },
    vesselTypeId: {
      init: "" as string,
    },
    classificationSocietyId: {
      init: "" as string,
    },
    flangeId: {
      init: "" as string,
    },
    image: { init: null as (File & { preview: string }) | null },
  },

  validateOn: ["submit"],
});

export const getEditDataFx = createEffect<string, EditEngine, Error>(async (engineId) => {
  var editEngine = await axios.get<EditEngine>(`/editEngine/${engineId}`);

  const data = editEngine.data as any;

  for (const key in data) {
    if (data[key] === null) {
      data[key] = "";
    }
  }

  return data;
});

forward({
  from: getEditDataFx.doneData,
  to: editEngineForm.setForm,
});

forward({
  from: editEngineForm.formValidated,
  to: editEngineFx,
});
