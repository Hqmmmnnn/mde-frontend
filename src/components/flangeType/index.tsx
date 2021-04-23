import { flangeTypeData } from "../../engines_search/model";
import { CheckBox, CheckBoxListWithCollapse, DefaultCheckBox } from "../CheckBoxListWithCollapse";

export const FlangeType = () => (
  <CheckBoxListWithCollapse listLabel="Виды фланца">
    <DefaultCheckBox
      effStore={flangeTypeData.$store}
      handleChange={flangeTypeData.handleCheckBoxChange}
      checkBoxes={flangeTypeCheckBoxValues}
    />
  </CheckBoxListWithCollapse>
);

const flangeTypeCheckBoxValues: CheckBox[] = [
  { name: "wekding_neck", label: "wekding neck" },
  { name: "plate", label: "plate" },
  { name: "loose_plate", label: "loose plate" },
  { name: "hubbed_threaded", label: "hubbed threaded" },
  { name: "hubbed_slip_on", label: "hubbed slip on" },
  { name: "blank", label: "blank" },
];

export type FlangeCheckbox = {
  wekdingNeck: boolean;
  plate: boolean;
  loosePlate: boolean;
  hubbedThreaded: boolean;
  hubbedSlipOn: boolean;
  blank: boolean;
};

export const flangeTypeInitialState: FlangeCheckbox = {
  wekdingNeck: false,
  plate: false,
  loosePlate: false,
  hubbedThreaded: false,
  hubbedSlipOn: false,
  blank: false,
};
