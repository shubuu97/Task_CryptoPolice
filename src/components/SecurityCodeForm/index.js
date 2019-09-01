import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "react-intl-tel-input/dist/main.css";
import { primaryColor, secondaryColor } from "../../constants";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%",
    margin: "50px 0px"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  saveButton: {
    width: "100%",
    color: "white",
    backgroundColor: primaryColor,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: secondaryColor
    }
  },

  backButton: {
    width: "100%",
    textDecoration: "underline"
  }
}));

const SecurityCodeForm = props => {
  const {
    formData,
    isValid,
    handleInputChange,
    handleSaveBtnClick,
    goToPrevStep
  } = props;
  const classes = useStyles();
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3>Create your security code</h3>
          <h5 className="my-3">Enter code below</h5>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <TextField
            error={!isValid.securityCode}
            name="securityCode"
            id="securityCode"
            label="Security Code"
            value={formData.securityCode}
            onChange={handleInputChange}
            className={classes.textField}
          />
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <Button
            disabled={!(formData.securityCode && isValid.securityCode)}
            className={classes.saveButton}
            variant="outlined"
            onClick={handleSaveBtnClick}
          >
            Save and go further
          </Button>
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row form-group">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <Button className={classes.backButton} onClick={goToPrevStep}>
            Or go back!
          </Button>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default SecurityCodeForm;
