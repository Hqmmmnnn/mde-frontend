import { Slider, makeStyles, Typography } from "@material-ui/core";
import { useStore } from "effector-react";
import { $powerRating, powerRatingChanged } from "../engines_search/model";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
});

function valueText(value: number) {
  return `${value}`;
}

export const PowerRatingSlider = () => {
  const powerRating = useStore($powerRating);
  const classes = useStyles();

  const handleChange = (e: any, newValue: number | number[]) => {
    console.log(newValue);
    powerRatingChanged(newValue as number[]);
  };

  return (
    <div className={classes.root}>
      <Typography id="power-rating-slider" gutterBottom>
        Мощность двигателя
      </Typography>
      <Slider
        value={powerRating}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={2000}
        max={3000}
        aria-labelledby="power-rating-slider"
        getAriaValueText={valueText}
      />
    </div>
  );
};
