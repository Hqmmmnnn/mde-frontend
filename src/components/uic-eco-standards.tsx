import { Box, FormGroup } from "@material-ui/core";
import { uicEcoStandardData } from "../engines_search/model";
import { CheckBoxListWithCollapse } from "./check-box-list-with-collapse";
import { Checkboxes } from "./checkbox/Checkbox";

export const UicEcoStandard = () => (
  <CheckBoxListWithCollapse listLabel="UIC эко стандарт">
    <Box p={0.25}>
      <FormGroup>
        <Checkboxes
          $checkboxes={uicEcoStandardData.$checkboxes}
          checkedChanged={uicEcoStandardData.checkedChanged}
        />
      </FormGroup>
    </Box>
  </CheckBoxListWithCollapse>
);
