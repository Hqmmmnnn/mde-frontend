import { Box, FormGroup } from "@material-ui/core";
import { CheckBoxListWithCollapse } from "../../components/check-box-list-with-collapse";
import { Checkboxes } from "../../components/checkbox/checkbox";
import { imoEcoStandardData } from "./model";

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
