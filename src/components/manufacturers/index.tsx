import { manufacturersData } from "../../engines_search/model";
import { CheckboxProps } from "../checkbox/model";
import { CheckBoxesWithSearch } from "../CheckBoxeListWithCollapseAndSearch";
import { CheckBoxListWithCollapse } from "../CheckBoxListWithCollapse";

export const Manufacturers = () => (
  <CheckBoxListWithCollapse listLabel="Производители">
    <CheckBoxesWithSearch
      $filteredCheckboxes={manufacturersData.$filteredCheckboxes}
      checkedChanged={manufacturersData.checkedChanged}
      checkboxesFiltered={manufacturersData.checkboxesFiltered}
    />
  </CheckBoxListWithCollapse>
);
