import { Box, FormGroup } from "@material-ui/core";
import { flangeTypeData } from "../engines_search/model";
import { Checkboxes } from "./checkbox/Checkbox";
import { CheckBoxListWithCollapse } from "./CheckBoxListWithCollapse";

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
