import { Box, FormGroup } from "@material-ui/core";
import { epaEcoStandardData } from "../engines_search/model";
import { CheckBoxListWithCollapse } from "./check-box-list-with-collapse";
import { Checkboxes } from "./checkbox/Checkbox";

export const EpaEcoStandard = () => (
  <CheckBoxListWithCollapse listLabel="EPA эко стандарт">
    <Box p={0.25}>
      <FormGroup>
        <Checkboxes
          $checkboxes={epaEcoStandardData.$checkboxes}
          checkedChanged={epaEcoStandardData.checkedChanged}
        />
      </FormGroup>
    </Box>
  </CheckBoxListWithCollapse>
);
