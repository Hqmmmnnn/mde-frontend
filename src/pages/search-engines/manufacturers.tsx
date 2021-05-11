import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { CheckBoxesWithSearch } from "../../components/check-boxe-list-with-collapse-and-search";
import { manufacturersData } from "./model";

export const Manufacturers = () => (
  <CheckBoxListWithCollapse listLabel="Производители">
    <CheckBoxesWithSearch
      $filteredCheckboxes={manufacturersData.$filteredCheckboxes}
      checkedChanged={manufacturersData.checkedChanged}
      checkboxesFiltered={manufacturersData.checkboxesFiltered}
      placeholder="Имя производителя"
    />
  </CheckBoxListWithCollapse>
);
