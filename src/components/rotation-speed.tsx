import { Box, FormGroup } from "@material-ui/core";
import { rotationSpeedData } from "../engines_search/model";
import { Checkboxes } from "./checkbox/Checkbox";
import { CheckBoxListWithCollapse } from "./check-box-list-with-collapse";

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
