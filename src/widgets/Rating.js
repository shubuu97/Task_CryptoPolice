import React from "react";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

const RatingComponent = props => (
  <Box component="fieldset" mb={3} borderColor="transparent">
    <Rating value={props.rating} readOnly />
  </Box>
);

export default RatingComponent;
