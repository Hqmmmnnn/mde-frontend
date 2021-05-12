import { useStore } from "effector-react";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { CheckBoxesWithSearch } from "../../components/check-boxe-list-with-collapse-and-search";
import { manufacturersData } from "./model";

export const Manufacturers = () => {
  const value = useStore(manufacturersData.$value);

  return (
    <CheckBoxListWithCollapse listLabel="Производители">
      <CheckBoxesWithSearch
        value={value}
        $filteredCheckboxes={manufacturersData.$filteredCheckboxes}
        checkedChanged={manufacturersData.checkedChanged}
        checkboxesFiltered={manufacturersData.checkboxesFiltered}
        placeholder="Имя производителя"
      />
    </CheckBoxListWithCollapse>
  );
};
