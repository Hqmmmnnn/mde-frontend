import { Box, FormGroup } from "@material-ui/core";
import { euEcoStandardData } from "./model";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { Checkboxes } from "../../components/checkbox/checkbox";

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
