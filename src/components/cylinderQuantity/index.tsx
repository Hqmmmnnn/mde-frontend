import { Box, FormGroup } from "@material-ui/core";
import { cylinderQuantityData } from "../../engines_search/model";
import { Checkboxes } from "../checkbox/Checkbox";
import { CheckboxProps } from "../checkbox/model";
import { CheckBoxListWithCollapse } from "../CheckBoxListWithCollapse";

export const CylinderQuantity = () => (
  <CheckBoxListWithCollapse listLabel="Количество цилиндров">
    <Box p={0.25}>
      <FormGroup>
        <Checkboxes
          $checkboxes={cylinderQuantityData.$checkboxes}
          checkedChanged={cylinderQuantityData.checkedChanged}
        />
      </FormGroup>
    </Box>
  </CheckBoxListWithCollapse>
);
