import {
  Collapse,
  FormControl,
  IconButton,
  Typography,
  Box,
  Container,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import clsx from "clsx";
import { ExpandMore } from "@material-ui/icons";
import { useState } from "react";

export type CheckBoxListWithCollapseProps = {
  listLabel: string;
  children: React.ReactNode;
};

export const CheckBoxListWithCollapse = ({
  listLabel,
  children,
}: CheckBoxListWithCollapseProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container disableGutters>
      <FormControl component="fieldset" className={classes.wrapper}>
        <CheckBoxLabel
          handleExpandClick={handleExpandClick}
          expanded={expanded}
          listLabel={listLabel}
        />

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </FormControl>
    </Container>
  );
};

type CheckBoxLabelProps = {
  handleExpandClick: () => void;
  expanded: boolean;
  listLabel: string;
};

export const CheckBoxLabel = ({ handleExpandClick, expanded, listLabel }: CheckBoxLabelProps) => {
  const classes = useStyles();

  return (
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
        <Typography component="h3">{listLabel}</Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
    },
    card: {
      display: "flex",
      flexDirection: "row",
      cursor: "pointer",
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
