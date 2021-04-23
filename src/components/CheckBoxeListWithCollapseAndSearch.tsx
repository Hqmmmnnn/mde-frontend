import {
  Box,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  makeStyles,
} from "@material-ui/core";

import { useState } from "react";
import { CheckBoxesProps, EffCheckbox } from "./CheckBoxListWithCollapse";
import SearchIcon from "@material-ui/icons/Search";

export const CheckBoxesWithSearch = function <T>({
  checkBoxes,
  effStore,
  handleChange,
}: CheckBoxesProps<T>) {
  const classes = useCheckBoxesWithSearchStyles();
  const [items, setItems] = useState(checkBoxes);

  const filterCheckBoxes = (e: any) => {
    setItems(
      checkBoxes.filter((c) =>
        c.name.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())
      )
    );
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
        <FormGroup>
          {items.map(({ name, label }) => (
            <FormControlLabel
              key={name}
              control={<EffCheckbox name={name} effStore={effStore} handleChange={handleChange} />}
              label={label}
            />
          ))}
        </FormGroup>
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
