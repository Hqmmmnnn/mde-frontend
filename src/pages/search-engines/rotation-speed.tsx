import { Box, FormGroup } from "@material-ui/core";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { Checkboxes } from "../../components/checkbox/Checkbox";
import { rotationFrequencyData } from "./model";

export const RotationFrequency = () => (
  <CheckBoxListWithCollapse listLabel="Частота вращения">
    <Box p={0.25}>
      <FormGroup>
        <Checkboxes
          $checkboxes={rotationFrequencyData.$checkboxes}
          checkedChanged={rotationFrequencyData.checkedChanged}
        />
      </FormGroup>
    </Box>
  </CheckBoxListWithCollapse>
);
