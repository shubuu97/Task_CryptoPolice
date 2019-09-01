import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px"
  },
  col: {
    flexBasis: "50%"
  },
  typographhy: {
    padding: "10px",
    color: "black",
    fontWeight: "bold"
  }
});

const InfoCard = props => {
  const {
    domainRegistrationDate,
    domainExpirationDate,
    phishtankStatus,
    etherscamStatus
  } = props.responseData;

  const { classes } = props;
  return (
    <Card className={classes.card}>
      <div className={classes.col}>
        <Typography
          className={classes.typographhy}
          color="textSecondary"
          gutterBottom
        >
          Domain Registration Date: {domainRegistrationDate}
        </Typography>
        <Typography
          className={classes.typographhy}
          color="textSecondary"
          gutterBottom
        >
          Domain Expiration Date: {domainExpirationDate}
        </Typography>
      </div>
      <div className={classes.col}>
        <Typography
          className={classes.typographhy}
          color="textSecondary"
          gutterBottom
        >
          Phistank Status: {phishtankStatus}
        </Typography>
        <Typography
          className={classes.typographhy}
          color="textSecondary"
          gutterBottom
        >
          Etherscam Status: {etherscamStatus}
        </Typography>
      </div>
    </Card>
  );
};

export default withStyles(styles)(InfoCard);
