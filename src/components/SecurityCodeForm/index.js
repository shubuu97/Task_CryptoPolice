import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "react-intl-tel-input/dist/main.css";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 1000
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const SecurityCodeForm = props => {
  const { formData, isValid, handleInputChange, handleSaveBtnClick } = props;
  const classes = useStyles();
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3>Create your security code</h3>
          <h5 className="my-3">Enter code below</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center mb-4">Security Code</h3>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-6 offset-md-3">
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
      </div>
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <Button
            variant="contained"
            handleClick={() => {
              handleSaveBtnClick("securitycode");
            }}
          >
            Save and go further
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          {/* <Button handleClick={goToPrevStep}>Or go back!</Button> */}
        </div>
      </div>
    </div>
  );
};

export default SecurityCodeForm;
