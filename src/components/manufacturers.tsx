import { manufacturersData } from "../engines_search/model";
import { CheckBoxesWithSearch } from "./check-boxe-list-with-collapse-and-search";
import { CheckBoxListWithCollapse } from "./check-box-list-with-collapse";

export const Manufacturers = () => (
  <CheckBoxListWithCollapse listLabel="Производители">
    <CheckBoxesWithSearch
      $filteredCheckboxes={manufacturersData.$filteredCheckboxes}
      checkedChanged={manufacturersData.checkedChanged}
      checkboxesFiltered={manufacturersData.checkboxesFiltered}
    />
  </CheckBoxListWithCollapse>
);
