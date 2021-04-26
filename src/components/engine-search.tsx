import { makeStyles, Paper, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { engineModelChanged } from "../engines_search/model";

const useStyles = makeStyles((theme) => ({
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

export const EngineSearch = () => {
  const classes = useStyles();

  return (
    <Paper component="div" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Искать по модели"
        onChange={(e: any) => {
          engineModelChanged(e.target.value);
        }}
      />
      <IconButton
        size="small"
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
