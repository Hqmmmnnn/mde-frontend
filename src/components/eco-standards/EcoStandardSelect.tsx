import { FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";

export type EcoStanardItemValue = {
  value: string;
  name: string;
};

type EcoStandardSelectProps = {
  labelId: string;
  labelName: string;
  selectId: string;
  onChange: (e: any) => void;
  items: EcoStanardItemValue[];
};

export const EcoStandardSelect = ({
  labelId,
  selectId,
  labelName,
  onChange,
  items,
}: EcoStandardSelectProps) => {
  const classes = useStyles();

  return (
    <FormControl size="small" variant="outlined" className={classes.formControl}>
      <InputLabel id={labelId}>{labelName}</InputLabel>
      <Select label={labelName} labelId={labelId} id={selectId} defaultValue="" onChange={onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {items.map((item) => (
          <MenuItem key={item.name} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1, 0),
    minWidth: 200,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
