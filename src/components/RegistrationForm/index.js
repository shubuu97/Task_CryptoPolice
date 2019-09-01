import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import PhoneNoInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import categoryOptions from "../../utility/categoryOptions";
import { primaryColor, secondaryColor } from "../../constants";
import Checkbox from "@material-ui/core/Checkbox";

const CustomCheckbox = withStyles({
  root: {
    color: primaryColor,
    "&$checked": {
      color: primaryColor
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%",
    margin: "10px 0px"
  },
  select: {
    width: "100%"
  },
  button: {
    width: "100%",
    color: "white",
    backgroundColor: primaryColor,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: secondaryColor
    }
  }
}));

const RegistrationForm = props => {
  const {
    formData,
    isValid,
    handleInputChange,
    handleRegisterClick,
    handlePhoneNoChange,
    handleCheckboxChange
  } = props;
  const { email, phoneNumber, password, agreeCheck } = isValid;
  const classes = useStyles();
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center mb-4">Register</h3>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <TextField
            error={!email}
            name="email"
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={classes.textField}
          />
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <PhoneNoInput
            style={{ width: "100%" }}
            containerClassName="intl-tel-input"
            preferredCountries={["in"]}
            onPhoneNumberChange={handlePhoneNoChange}
            autoPlaceholder
            value={formData.phoneNumber}
            inputClassName={
              phoneNumber ? "form-control" : " form-control is-invalid"
            }
          />
          ,
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <Select
            autoWidth
            value={formData.category}
            onChange={handleInputChange}
            disableEmpty
            inputProps={{
              name: "category",
              id: "category"
            }}
            className={classes.select}
          >
            {categoryOptions.map(categoryOption => {
              const { name, value } = categoryOption;
              return (
                <MenuItem className={classes.select} value={value}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <TextField
            error={!password}
            type="password"
            id="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={classes.textField}
          />
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <CustomCheckbox
            checked={formData.agreeCheck}
            onChange={handleCheckboxChange}
            name="agreeCheck"
            value="agree"
            inputProps={{
              "aria-label": "agree checkbox"
            }}
            className={classes.checkbox}
          />
          Agree with terms and conditions
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <Button
            disabled={
              !(
                formData.email &&
                formData.phoneNumber &&
                formData.password &&
                formData.agreeCheck &&
                email &&
                phoneNumber &&
                password
              )
            }
            className={classes.button}
            variant="outlined"
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default RegistrationForm;
