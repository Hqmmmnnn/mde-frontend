import { useStore } from "effector-react";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { CheckBoxesWithSearch } from "../../components/check-boxe-list-with-collapse-and-search";
import { rotationFrequencyData } from "./model";

export const RotationFrequency = () => {
  const value = useStore(rotationFrequencyData.$value);

  return (
    <CheckBoxListWithCollapse listLabel="Частота вращения">
      <CheckBoxesWithSearch
        value={value}
        $filteredCheckboxes={rotationFrequencyData.$filteredCheckboxes}
        checkedChanged={rotationFrequencyData.checkedChanged}
        checkboxesFiltered={rotationFrequencyData.checkboxesFiltered}
        placeholder="Поиск по значению"
      />
    </CheckBoxListWithCollapse>
  );
};
