import { Box, FormGroup } from "@material-ui/core";
import { euEcoStandardData } from "../engines_search/model";
import { CheckBoxListWithCollapse } from "./check-box-list-with-collapse";
import { Checkboxes } from "./checkbox/Checkbox";

export const EuEcoStandard = () => (
  <CheckBoxListWithCollapse listLabel="EU эко стандарт">
    <Box p={0.25}>
      <FormGroup>
        <Checkboxes
          $checkboxes={euEcoStandardData.$checkboxes}
          checkedChanged={euEcoStandardData.checkedChanged}
        />
      </FormGroup>
    </Box>
  </CheckBoxListWithCollapse>
);
