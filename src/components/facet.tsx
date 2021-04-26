import {
  Slider,
  makeStyles,
  Typography,
  TextField,
  Box,
  Icon,
  Collapse,
  IconButton,
  createStyles,
  Theme,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import clsx from "clsx";
import { useStore } from "effector-react";
import { useState } from "react";
import { FacetData } from "../engines_search/model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 200,
    },
    box: {
      display: "inline-flex",
    },
    card: {
      display: "flex",
      flexDirection: "row",
      cursor: "pointer",
    },
    separator: {
      margin: "8px 0px",
    },
    expand: {
      transform: "rotate(0deg)",
      margin: "0px",
      padding: "0px",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

type FacetProps = {
  data: FacetData;
  label: string;
};

export const Facet = ({ data, label }: FacetProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { handleFromChange, handleToChange, handleFromToChange, $facetStore } = data;
  const { from, to } = useStore($facetStore);
  const initialState = useState($facetStore.defaultState)[0];

  return (
    <>
      <Box className={classes.card} onClick={handleExpandClick} maxWidth="100%">
        <IconButton
          size="medium"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
        <Box p={1.5}>
          <Typography>{label}</Typography>
        </Box>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box className={classes.box}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="от"
            value={from}
            onChange={handleFromChange}
          />
          <Box className={classes.separator}>
            <Icon color="primary">
              <RemoveOutlinedIcon />
            </Icon>
          </Box>
          <TextField
            size="small"
            variant="outlined"
            placeholder="до"
            value={to}
            onChange={handleToChange}
          />
        </Box>
        <Slider
          step={10}
          value={[
            from < initialState.from ? initialState.from : from,
            to > initialState.to ? initialState.to : to,
          ]}
          onChange={handleFromToChange}
          min={initialState.from}
          max={initialState.to}
          aria-labelledby="power-rating-slider"
        />
      </Collapse>
    </>
  );
};
