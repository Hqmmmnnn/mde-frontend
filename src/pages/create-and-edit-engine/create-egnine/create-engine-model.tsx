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
    rotationSpeed: {
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
    cylinderQuantity: {
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
    injectionType: {
      init: "" as string,
    },
    injectionPressure: {
      init: "" as string,
    },
    cylinderMaxPressure: {
      init: "" as string,
    },
    cylinderArrangement: {
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
    coolingSystemType: {
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
    imoEcoStandard: {
      init: "" as string,
    },
    epaEcoStandard: {
      init: "" as string,
    },
    euEcoStandard: {
      init: "" as string,
    },
    uicEcoStandard: {
      init: "" as string,
    },
    vesselType: {
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
