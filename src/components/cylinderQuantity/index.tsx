import { cylinderQuantityData } from "../../engines_search/model";
import { CheckBox, CheckBoxListWithCollapse, DefaultCheckBox } from "../CheckBoxListWithCollapse";

export const CylinderQuantity = () => {
  return (
    <CheckBoxListWithCollapse listLabel={"Количество цилиндров"}>
      <DefaultCheckBox
        effStore={cylinderQuantityData.$store}
        checkBoxes={cylinderQuantityCheckBoxValues}
        handleChange={cylinderQuantityData.handleCheckBoxChange}
      />
    </CheckBoxListWithCollapse>
  );
};

const cylinderQuantityCheckBoxValues: CheckBox[] = [
  { name: "4", label: "4" },
  { name: "6", label: "6" },
  { name: "8", label: "8" },
  { name: "9", label: "9" },
  { name: "10", label: "10" },
  { name: "12", label: "12" },
  { name: "16", label: "16" },
  { name: "20", label: "20" },
  { name: "42", label: "42" },
  { name: "56", label: "56" },
];

export type CylinderQuantityCheckbox = {
  4: boolean;
  6: boolean;
  7: boolean;
  9: boolean;
  12: boolean;
  16: boolean;
  20: boolean;
  42: boolean;
  52: boolean;
};

export const cylinderQuantityInitialValue: CylinderQuantityCheckbox = {
  4: false,
  6: false,
  7: false,
  9: false,
  12: false,
  16: false,
  20: false,
  42: false,
  52: false,
};
