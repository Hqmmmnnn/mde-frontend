import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useList } from "effector-react";

import { CheckboxDataProps } from "./model";

export const Checkboxes = ({ $checkboxes, checkedChanged }: CheckboxDataProps) =>
  useList($checkboxes, ({ name, label, checked }) => (
    <FormControlLabel
      style={{ paddingLeft: "12px" }}
      key={name}
      control={
        <Checkbox
          color="primary"
          checked={checked}
          onChange={() => checkedChanged(name)}
          name={name}
        />
      }
      label={label}
    />
  ));
