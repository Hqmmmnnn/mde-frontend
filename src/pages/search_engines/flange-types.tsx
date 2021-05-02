import { Box, FormGroup } from "@material-ui/core";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { Checkboxes } from "../../components/checkbox/Checkbox";
import { flangeTypeData } from "./model";

export const FlangeTypes = () => (
  <CheckBoxListWithCollapse listLabel="Виды фланца">
    <Box p={0.25}>
      <FormGroup>
        <Checkboxes
          $checkboxes={flangeTypeData.$checkboxes}
          checkedChanged={flangeTypeData.checkedChanged}
        />
      </FormGroup>
    </Box>
  </CheckBoxListWithCollapse>
);
