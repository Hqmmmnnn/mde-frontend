import { attach, createEffect, createStore, forward } from "effector";
import {
  EditEngine,
  EditEngineRequest,
  enginesApi,
  LoadEngineDataRequest,
} from "../../../api/engines";
import { createForm } from "effector-forms/dist";
import {
  EngineFileName,
  filesApi,
  DeleteFileRequest,
  SaveEngineFilesData,
  SaveEngineFilesRequest,
} from "../../../api/files";
import { $token } from "../../../features/common/token-model";
import {
  DeleteImageRequest,
  imagesApi,
  SaveEngineImageData,
  SaveImageRequest,
} from "../../../api/images";
import { AxiosResponse } from "axios";

const saveEngineFilesFx = createEffect<SaveEngineFilesRequest, EngineFileName[], Error>(
  filesApi.saveFiles
);

export const saveEngineFilesWithTokenFx = attach({
  effect: saveEngineFilesFx,
  source: $token,
  mapParams: (data: SaveEngineFilesData, token: string | null) => ({ data, token }),
});

const deleteEngineFileFx = createEffect<DeleteFileRequest, string, Error>(filesApi.deleteFile);

export const deleteEngineFileWithTokenFx = attach({
  effect: deleteEngineFileFx,
  source: $token,
  mapParams: (fileId: string, token: string | null) => ({ fileId, token }),
});

export const getFilesFx = createEffect<string, EngineFileName[], Error>(filesApi.getFiles);

export const $editEngineFiles = createStore<EngineFileName[]>([])
  .on(getFilesFx.doneData, (_, files) => files)
  .on(saveEngineFilesFx.doneData, (state, payload) => [...state, ...payload])
  .on(deleteEngineFileFx.doneData, (state, fileId) => state.filter(({ id }) => id !== fileId));

const deleteEngineImageFx = createEffect<DeleteImageRequest, void, Error>(imagesApi.deleteImage);

export const deleteEngineImageWithTokenFx = attach({
  effect: deleteEngineImageFx,
  source: $token,
  mapParams: (engineId: string, token: string | null) => ({ engineId, token }),
});

const saveEngineImageFx = createEffect<SaveImageRequest, void, Error>(imagesApi.saveImage);

export const saveEngineImageFxWithToken = attach({
  effect: saveEngineImageFx,
  source: $token,
  mapParams: (data: SaveEngineImageData, token: string | null) => ({ data, token }),
});

export const getEngineImageFx = createEffect<string, Blob, Error>(imagesApi.getImageForUpdate);

export const $engineImage = createStore("")
  .on(getEngineImageFx.doneData, (_, blob) => URL.createObjectURL(blob))
  .on(getEngineImageFx.failData, (_, __) => "")
  .reset(deleteEngineImageFx.done);

export const $isEngineImageExist = $engineImage.map((img) => img !== "");

const editEngineFx = createEffect<EditEngineRequest, Promise<AxiosResponse<any>>, Error>(
  enginesApi.editEngine
);

export const editEngineFxWithToken = attach({
  effect: editEngineFx,
  source: $token,
  mapParams: (data: EditEngine, token: string | null) => ({ data, token }),
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
    note: {
      init: "" as string,
    },
    image: { init: null as (File & { preview: string }) | null },
  },

  validateOn: ["submit"],
});

const getEditDataForEditFx = createEffect<LoadEngineDataRequest, EditEngine, Error>(
  enginesApi.loadEngineData
);

export const loadEngineDataForEditFxWithToken = attach({
  effect: getEditDataForEditFx,
  source: $token,
  mapParams: (engineId: number, token: string | null) => ({ engineId, token }),
});

forward({
  from: getEditDataForEditFx.doneData,
  to: editEngineForm.setForm,
});
