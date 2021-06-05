import { Box, FormGroup } from "@material-ui/core";
import { epaEcoStandardData } from "./model";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { Checkboxes } from "../../components/checkbox/checkbox";

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
