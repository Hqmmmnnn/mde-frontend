import {
  Select,
  MenuItem,
  FormControl,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import { epaEcoStandardChanged } from "../engines_search/model";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const EpaEcoStandard = () => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="epa-eco-standard-select-outlined-label">
        EPA eco standard
      </InputLabel>
      <Select
        label="EPA eco standard"
        labelId="outlinedd-epa-eco-standard-select-label"
        id="outlined-epa-eco-standard-select"
        defaultValue=""
        onChange={(e: any) => {
          epaEcoStandardChanged(e.target.value);
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="EPA_I">EPA I</MenuItem>
        <MenuItem value="EPA_II">EPA II</MenuItem>
        <MenuItem value="EPA_III">EPA III</MenuItem>
        <MenuItem value="EPA_IV">EPA IV</MenuItem>
        <MenuItem value="T2C">T2C</MenuItem>
        <MenuItem value="T2R">T2R</MenuItem>
        <MenuItem value="T2CR">T2CR</MenuItem>
        <MenuItem value="NRT2">NRT2</MenuItem>
        <MenuItem value="NC">NC</MenuItem>
        <MenuItem value="T3C">T3C</MenuItem>
        <MenuItem value="T1">T1</MenuItem>
        <MenuItem value="T3R">T3R</MenuItem>
      </Select>
    </FormControl>
  );
};
