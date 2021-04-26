import { Box, FormGroup } from "@material-ui/core";
import { imoEcoStandardData } from "../engines_search/model";
import { CheckBoxListWithCollapse } from "./check-box-list-with-collapse";
import { Checkboxes } from "./checkbox/Checkbox";

export const ImoEcoStandard = () => (
  <CheckBoxListWithCollapse listLabel="IMO эко стандарт">
    <Box p={0.25}>
      <FormGroup>
        <Checkboxes
          $checkboxes={imoEcoStandardData.$checkboxes}
          checkedChanged={imoEcoStandardData.checkedChanged}
        />
      </FormGroup>
    </Box>
  </CheckBoxListWithCollapse>
);
