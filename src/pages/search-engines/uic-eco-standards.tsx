import { Box, FormGroup } from "@material-ui/core";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { Checkboxes } from "../../components/checkbox/Checkbox";
import { uicEcoStandardData } from "./model";

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
