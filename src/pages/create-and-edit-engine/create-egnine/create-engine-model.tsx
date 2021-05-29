import { AxiosResponse } from "axios";
import { createEffect, attach } from "effector";
import { createForm } from "effector-forms/dist";
import { enginesApi, SaveEngine, SaveEngineReqest } from "../../../api/engines";
import { $token } from "../../../features/common/token";

const saveEngineFx = createEffect<SaveEngineReqest, Promise<AxiosResponse<any>>, Error>(
  enginesApi.saveEngine
);

export const saveEngineFxWithToken = attach({
  effect: saveEngineFx,
  source: $token,
  mapParams: (data: SaveEngine, token: string | null) => ({ data, token }),
});

const createEngineForm = () => {
  return createForm({
    fields: {
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
      files: { init: null as File[] | null },
      image: { init: null as (File & { preview: string }) | null },
    },

    validateOn: ["submit"],
  });
};

export const newEngineForm = createEngineForm();
