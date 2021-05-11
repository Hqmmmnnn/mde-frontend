import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { CheckBoxesWithSearch } from "../../components/check-boxe-list-with-collapse-and-search";
import { rotationFrequencyData } from "./model";

export const RotationFrequency = () => (
  <CheckBoxListWithCollapse listLabel="Частота вращения">
    <CheckBoxesWithSearch
      $filteredCheckboxes={rotationFrequencyData.$filteredCheckboxes}
      checkedChanged={rotationFrequencyData.checkedChanged}
      checkboxesFiltered={rotationFrequencyData.checkboxesFiltered}
      placeholder="Поиск по частоте вращения"
    />
  </CheckBoxListWithCollapse>
);
