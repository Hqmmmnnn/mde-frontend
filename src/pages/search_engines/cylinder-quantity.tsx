import { Box, FormGroup } from "@material-ui/core";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { Checkboxes } from "../../components/checkbox/Checkbox";
import { cylinderQuantityData } from "./model";

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
