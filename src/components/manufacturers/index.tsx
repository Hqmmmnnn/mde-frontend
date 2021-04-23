import { manufacturersData } from "../../engines_search/model";
import { CheckBoxesWithSearch } from "../CheckBoxeListWithCollapseAndSearch";
import { CheckBox, CheckBoxListWithCollapse } from "../CheckBoxListWithCollapse";

export const Manufacturers = () => {
  return (
    <CheckBoxListWithCollapse listLabel="Производители">
      <CheckBoxesWithSearch
        checkBoxes={manufacturersCheckBoxValues}
        effStore={manufacturersData.$store}
        handleChange={manufacturersData.handleCheckBoxChange}
      />
    </CheckBoxListWithCollapse>
  );
};

const manufacturersCheckBoxValues: CheckBox[] = [
  { name: "MTU_Friedrichshafen_GmbH", label: "MTU Friedrichshafen GmbH" },
  { name: "BBBB", label: "BBBB" },
  { name: "CCCCC", label: "CCCCC" },
  { name: "BBBCCCCC", label: "BBBCCCCC" },
  { name: "nnnnn", label: "nnnnn" },
];

export type ManufacturersCheckBox = {
  MTU_Friedrichshafen_GmbH: boolean;
  BBBB: boolean;
  CCCCC: boolean;
  BBBCCCCC: boolean;
  nnnnn: boolean;
};

export const manufacturersInitialValue = {
  MTU_Friedrichshafen_GmbH: false,
  BBBB: false,
  CCCCC: false,
  BBBCCCCC: false,
  nnnnn: false,
};
