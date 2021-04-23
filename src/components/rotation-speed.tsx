import { rotationSpeedData } from "../engines_search/model";
import { CheckBox, CheckBoxListWithCollapse, DefaultCheckBox } from "./CheckBoxListWithCollapse";

export const RotationSpeed = () => (
  <CheckBoxListWithCollapse listLabel="Скорость вращения">
    <DefaultCheckBox
      effStore={rotationSpeedData.$store}
      handleChange={rotationSpeedData.handleCheckBoxChange}
      checkBoxes={rotationSpeedCheckBoxValues}
    />
  </CheckBoxListWithCollapse>
);

const rotationSpeedCheckBoxValues: CheckBox[] = [
  { name: "1000", label: "1000" },
  { name: "1200", label: "1200" },
  { name: "1500", label: "1500" },
  { name: "2000", label: "2000" },
  { name: "2500", label: "2500" },
];

export type RotationSpeedCheckbox = {
  1000: boolean;
  1200: boolean;
  1500: boolean;
  2000: boolean;
  2500: boolean;
};

export const rotationSpeedInitialState: RotationSpeedCheckbox = {
  1000: false,
  1200: false,
  1500: false,
  2000: false,
  2500: false,
};
