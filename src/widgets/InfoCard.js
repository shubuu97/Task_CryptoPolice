import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const InfoCard = props => {
  const {
    domainRegistrationDate,
    domainExpirationDate,
    phishtankStatus,
    etherscamStatus
  } = props.responseData;
  return (
    <Card>
      <Typography color="textSecondary" gutterBottom>
        Domain Registration Date: {domainRegistrationDate}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Domain Expiration Date: {domainExpirationDate}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Phis Tank Status: {phishtankStatus}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Etherscam Status: {etherscamStatus}
      </Typography>
    </Card>
  );
};

export default InfoCard;
