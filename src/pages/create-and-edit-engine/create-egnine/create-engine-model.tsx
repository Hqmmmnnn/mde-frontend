import axios from "axios";
import { createEffect, Effect, forward, restore, Store } from "effector";
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

export type SelectData = {
  id: number;
  value: string;
};

export type SelectedDataProps = {
  loadSelectDataFx: Effect<string, SelectData[], Error>;
  $selectedData: Store<SelectData[]>;
};

const getSelectedData = () => {
  const loadSelectDataFx = createEffect<string, SelectData[], Error>(async (url) => {
    const { data } = await axios.get<SelectData[]>(url);
    return data;
  });

  const $selectedData = restore(loadSelectDataFx, []);

  return { loadSelectDataFx, $selectedData };
};

export const manufacturersSelect = getSelectedData();
export const assignmentsSelect = getSelectedData();
export const engineRatingSelect = getSelectedData();
export const classificationSocietySelect = getSelectedData();
export const flangeSelect = getSelectedData();
export const rotationFrequencySelect = getSelectedData();
export const cylinderQuantitySelect = getSelectedData();
export const imoEcoStandardSelect = getSelectedData();
export const epaEcoStandardSelect = getSelectedData();
export const euEcoStandardSelect = getSelectedData();
export const uicEcoStandardSelect = getSelectedData();
export const cylinderArrangementsSelect = getSelectedData();
export const injectionTypesSelect = getSelectedData();
export const vesselTypesSelect = getSelectedData();
export const coolingSystemTypesSelect = getSelectedData();

export const createEngineForm = createForm({
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

forward({
  from: createEngineForm.formValidated,
  to: saveEngineFx,
});
