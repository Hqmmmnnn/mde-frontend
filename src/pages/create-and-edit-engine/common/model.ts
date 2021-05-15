import axios from "axios";
import { createEffect, Effect, restore, Store } from "effector";

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
