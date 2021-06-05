import { attach, createEffect, restore } from "effector";
import { enginesApi, GetSelectedDataRequest } from "../../../api/engines";
import { $token } from "../../../features/common/token-model";

export type SelectData = {
  id: number;
  value: string;
};

const getSelectedData = () => {
  const loadSelectDataFx = createEffect<GetSelectedDataRequest, SelectData[], Error>(
    enginesApi.loadSelectedData
  );

  const loadSelectDataFxWithToken = attach({
    effect: loadSelectDataFx,
    source: $token,
    mapParams: (url: string, token: string | null) => ({ url, token }),
  });

  const $selectedData = restore(loadSelectDataFx, []);

  return { loadSelectDataFxWithToken, $selectedData };
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
