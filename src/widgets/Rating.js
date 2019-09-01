import React from "react";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  rating: {
    color: "green"
  }
}));

const RatingComponent = props => {
  const classes = useStyles();
  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Rating
        className={classes.rating}
        size="large"
        value={props.rating}
        precision={0.5}
        readOnly
      />
    </Box>
  );
};

export default RatingComponent;
