import { makeStyles, InputBase, IconButton, Card } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useStore } from "effector-react";
import { engineModelChanged, $engineModel } from "./model";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "6px 4px",
    display: "flex",
    alignItems: "center",
    minWidth: 200,
    margin: "0 16px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 5,
  },
}));

export const EngineSearch = () => {
  const value = useStore($engineModel);
  const classes = useStyles();

  return (
    <Card component="div" className={classes.root} variant="outlined">
      <InputBase
        className={classes.input}
        placeholder="Искать по модели"
        value={value}
        onChange={(e: any) => {
          engineModelChanged(e.target.value);
        }}
      />
      <IconButton size="medium" type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Card>
  );
};
