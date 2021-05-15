import axios from "axios";
import { createEffect, forward } from "effector";
import { createForm } from "effector-forms/dist";
import { SaveEngine } from "../../../api/Engines";

const saveEngineFx = createEffect<SaveEngine, void, Error>(async (createEngineFormData) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(createEngineFormData)) {
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

  axios({
    method: "POST",
    url: "/engines",
    data: formData,
  });
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
      rotationFrequencyId: {
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
      files: { init: null as File[] | null },
      image: { init: null as (File & { preview: string }) | null },
    },

    validateOn: ["submit"],
  });
};

export const newEngineForm = createEngineForm();

forward({
  from: newEngineForm.formValidated,
  to: saveEngineFx,
});
