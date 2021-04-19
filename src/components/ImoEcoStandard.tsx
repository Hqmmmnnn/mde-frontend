import {
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
  FormControl,
} from "@material-ui/core";
import { imoEcoStandardChanged } from "../engines_search/model";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const ImoEcoStandard = () => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="imo-eco-standard-select-helper-label">
        IMO eco standard
      </InputLabel>
      <Select
        label="EPA eco standard"
        labelId="imo-eco-standard-select-helper-label"
        id="imo-eco-standard-select-helper"
        defaultValue=""
        onChange={(e: any) => {
          imoEcoStandardChanged(e.target.value);
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="IMO_I">IMO I</MenuItem>
        <MenuItem value="IMO_II">IMO II</MenuItem>
        <MenuItem value="IMO_III">IMO III</MenuItem>
        <MenuItem value="IMO_IV">IMO IV</MenuItem>
        <MenuItem value="NST">NST</MenuItem>
        <MenuItem value="NC">NOx</MenuItem>
      </Select>
    </FormControl>
  );
};
