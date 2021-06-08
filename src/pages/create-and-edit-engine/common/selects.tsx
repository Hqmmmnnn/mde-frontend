import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { Event } from "effector";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import {
  manufacturersSelect,
  assignmentsSelect,
  engineRatingSelect,
  classificationSocietySelect,
  flangeSelect,
  cylinderQuantitySelect,
  imoEcoStandardSelect,
  epaEcoStandardSelect,
  euEcoStandardSelect,
  uicEcoStandardSelect,
  cylinderArrangementsSelect,
  injectionTypesSelect,
  vesselTypesSelect,
  coolingSystemTypesSelect,
} from "./model";
import { SelectedDataProps } from "../../../api/engines";

type SelectProps<T> = {
  value: T;
  onChange: Event<T>;
};

type CreateEngineSelectProps<T> = {
  labelId: string;
  labelName: string;
  selectId: string;
  selectData: SelectedDataProps;
  value: T;
  onChange: Event<T>;
  fetchingDataUrl: string;
};

export const CreateEngineSelect = function <T>({
  labelId,
  labelName,
  selectId,
  selectData,
  value,
  onChange,
  fetchingDataUrl,
}: CreateEngineSelectProps<T>) {
  const { loadSelectDataFxWithToken, $selectedData } = selectData;
  const items = useStore($selectedData);

  useEffect(() => {
    loadSelectDataFxWithToken(fetchingDataUrl);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" variant="outlined" fullWidth style={{ height: "100%" }}>
      <InputLabel id={labelId}>{labelName}</InputLabel>
      <Select
        label={labelName}
        labelId={labelId}
        id={selectId}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Не выбрано</em>
        </MenuItem>

        {items.map(({ id, value }) => (
          <MenuItem key={id} value={id}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const ManufacturerView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="manufacturersLabel"
    labelName="Производитель"
    selectId="manufacturersSelect"
    selectData={manufacturersSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/manufacturers"
  />
);

export const AssignmentView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="assignmentIdLabel"
    labelName="Назначение"
    selectId="assignmentIdSelect"
    selectData={assignmentsSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/assignments"
  />
);

export const EngineRatingView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="engineRatingIdLabel"
    labelName="Рейтинг"
    selectId="engineRatingIdSelect"
    selectData={engineRatingSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/engineRating"
  />
);

export const ClassificationSocietyView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="classificationSocietiesLabel"
    labelName="Классифиционное общество"
    selectId="classificationSocietiesSelect"
    selectData={classificationSocietySelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/classificationSociety"
  />
);

export const FlangeTypeView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="flangeTypeLabel"
    labelName="Тип фланца"
    selectId="flangeTypeSelect"
    selectData={flangeSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/flangeTypes"
  />
);

export const CylinderQuantityView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="cylinderQuantityLabel"
    labelName="Количество цилиндров"
    selectId="cylinderQuantitySelect"
    selectData={cylinderQuantitySelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/cylindersQuantity"
  />
);

export const ImoEcoStandardView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="imoEcoStandardLabel"
    labelName="IMO"
    selectId="imoEcoStandardSelect"
    selectData={imoEcoStandardSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/imoEcoStandards"
  />
);

export const EpaEcoStandardView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="epaEcoStandardLabel"
    labelName="EPA"
    selectId="epaEcoStandardSelect"
    selectData={epaEcoStandardSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/epaEcoStandards"
  />
);

export const EuEcoStandardView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="euEcoStandardLabel"
    labelName="EU"
    selectId="euEcoStandardSelect"
    selectData={euEcoStandardSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/euEcoStandards"
  />
);

export const UicEcoStandardView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="uicEcoStandardLabel"
    labelName="UIC"
    selectId="uicEcoStandardSelect"
    selectData={uicEcoStandardSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/uicEcoStandards"
  />
);

export const CylinderArrangementView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="cylinderArrangementLabel"
    labelName="Расположение"
    selectId="cylinderArrangementSelect"
    selectData={cylinderArrangementsSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/cylinderArrangements"
  />
);

export const InjectionTypeView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="injectionTypeLabel"
    labelName="Тип впрыска"
    selectId="injectionTypeSelect"
    selectData={injectionTypesSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/injectionTypes"
  />
);

export const VesselTypeView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="vesselTypeLabel"
    labelName="Тип судна"
    selectId="vesselTypeSelect"
    selectData={vesselTypesSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/vesselTypes"
  />
);

export const CoolingSystemTypeView = ({ value, onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="coolingSystemTypeLabel"
    labelName="Тип"
    selectId="coolingSystemTypeSelect"
    selectData={coolingSystemTypesSelect}
    value={value}
    onChange={onChange}
    fetchingDataUrl="/api/selectData/coolingSystemTypes"
  />
);
