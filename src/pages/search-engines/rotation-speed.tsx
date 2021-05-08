import { Box, FormGroup } from "@material-ui/core";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { Checkboxes } from "../../components/checkbox/Checkbox";
import { rotationSpeedData } from "./model";

export const RotationSpeed = () => (
  <CheckBoxListWithCollapse listLabel="Скорость вращения">
    <Box p={0.25}>
      <FormGroup>
        <Checkboxes
          $checkboxes={rotationSpeedData.$checkboxes}
          checkedChanged={rotationSpeedData.checkedChanged}
        />
      </FormGroup>
    </Box>
  </CheckBoxListWithCollapse>
);
