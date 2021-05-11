import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { Event } from "effector";
import {
  assignmentsSelect,
  classificationSocietySelect,
  engineRatingSelect,
  flangeSelect,
  manufacturersSelect,
  SelectedDataProps,
  rotationFrequencySelect,
  cylinderQuantitySelect,
  imoEcoStandardSelect,
  epaEcoStandardSelect,
  euEcoStandardSelect,
  uicEcoStandardSelect,
} from "../create-egnine/create-engine-model";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

type SelectProps<T> = {
  onChange: Event<T>;
};

type CreateEngineSelectProps = {
  labelId: string;
  labelName: string;
  selectId: string;
  selectData: SelectedDataProps;
  onChange: Event<string>;
  fetchingDataUrl: string;
};

const CreateEngineSelect = ({
  labelId,
  labelName,
  selectId,
  selectData,
  onChange,
  fetchingDataUrl,
}: CreateEngineSelectProps) => {
  const { loadSelectDataFx, $selectedData } = selectData;
  const items = useStore($selectedData);

  useEffect(() => {
    loadSelectDataFx(fetchingDataUrl);
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
        defaultValue=""
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

export const ManufacturerView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="manufacturersLabel"
    labelName="Производитель"
    selectId="manufacturersSelect"
    selectData={manufacturersSelect}
    onChange={onChange}
    fetchingDataUrl="/manufacturersData"
  />
);

export const AssignmentView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="assignmentIdLabel"
    labelName="Назначение"
    selectId="assignmentIdSelect"
    selectData={assignmentsSelect}
    onChange={onChange}
    fetchingDataUrl="/assignmentsData"
  />
);

export const EngineRatingView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="engineRatingIdLabel"
    labelName="Рейтинг двигателя"
    selectId="engineRatingIdSelect"
    selectData={engineRatingSelect}
    onChange={onChange}
    fetchingDataUrl="/engineRatingData"
  />
);

export const ClassificationSocietyView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="classificationSocietiesLabel"
    labelName="Классифиционное общество"
    selectId="classificationSocietiesSelect"
    selectData={classificationSocietySelect}
    onChange={onChange}
    fetchingDataUrl="/classificationSocietyData"
  />
);

export const FlangeTypeView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="flangeTypeLabel"
    labelName="Тип фланца"
    selectId="flangeTypeSelect"
    selectData={flangeSelect}
    onChange={onChange}
    fetchingDataUrl="/flangeTypesData"
  />
);

export const RotationFrequencyView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="rotationFrequencyLabel"
    labelName="Частота вращения"
    selectId="rotationFrequencySelect"
    selectData={rotationFrequencySelect}
    onChange={onChange}
    fetchingDataUrl="/rotationFrequenciesData"
  />
);

export const CylinderQuantityView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="cylinderQuantityLabel"
    labelName="Количество цилиндров"
    selectId="cylinderQuantitySelect"
    selectData={cylinderQuantitySelect}
    onChange={onChange}
    fetchingDataUrl="/cylindersQuantityData"
  />
);

export const ImoEcoStandardView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="imoEcoStandardLabel"
    labelName="IMO"
    selectId="imoEcoStandardSelect"
    selectData={imoEcoStandardSelect}
    onChange={onChange}
    fetchingDataUrl="/imoEcoStandardsData"
  />
);

export const EpaEcoStandardView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="epaEcoStandardLabel"
    labelName="EPA"
    selectId="epaEcoStandardSelect"
    selectData={epaEcoStandardSelect}
    onChange={onChange}
    fetchingDataUrl="/epaEcoStandardsData"
  />
);

export const EuEcoStandardView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="euEcoStandardLabel"
    labelName="EU"
    selectId="euEcoStandardSelect"
    selectData={euEcoStandardSelect}
    onChange={onChange}
    fetchingDataUrl="/euEcoStandardsData"
  />
);

export const UicEcoStandardView = ({ onChange }: SelectProps<string>) => (
  <CreateEngineSelect
    labelId="uicEcoStandardLabel"
    labelName="UIC"
    selectId="uicEcoStandardSelect"
    selectData={uicEcoStandardSelect}
    onChange={onChange}
    fetchingDataUrl="/uicEcoStandardsData"
  />
);
