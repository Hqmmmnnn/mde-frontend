import { Box, IconButton, InputBase, makeStyles } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { Checkboxes } from "./checkbox/Checkbox";
import { CheckboxWithSearchDataProps } from "./checkbox/model";

export const CheckBoxesWithSearch = ({
  $filteredCheckboxes,
  checkedChanged,
  checkboxesFiltered,
}: CheckboxWithSearchDataProps) => {
  const classes = useCheckBoxesWithSearchStyles();

  const filterCheckBoxes = (e: any) => {
    checkboxesFiltered(e.target.value);
  };

  return (
    <>
      <Box component="div" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Имя производителя"
          onChange={filterCheckBoxes}
        />
        <IconButton size="small" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>

      <Box p={0.25}>
        <Checkboxes $checkboxes={$filteredCheckboxes} checkedChanged={checkedChanged} />
      </Box>
    </>
  );
};

const useCheckBoxesWithSearchStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    minWidth: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));
