import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import PhoneNoInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import categoryOptions from "../../utility/categoryOptions";

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

const RegistrationForm = props => {
  const {
    formData,
    isValid,
    handleInputChange,
    handleRegisterClick,
    handlePhoneNoChange
  } = props;
  const classes = useStyles();
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center mb-4">Register</h3>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-8">
          <TextField
            error={!isValid.email}
            name="email"
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={classes.textField}
          />
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-8">
          <PhoneNoInput
            containerClassName="intl-tel-input"
            preferredCountries={["in"]}
            onPhoneNumberChange={handlePhoneNoChange}
            autoPlaceholder
            inputClassName={
              isValid.phoneNumber ? "form-control" : " form-control is-invalid"
            }
          />
          ,
        </div>
      </div>
      <div className="row form-group">
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
          >
            {categoryOptions.map(categoryOption => {
              const { name, value } = categoryOption;
              return <MenuItem value={value}>{name}</MenuItem>;
            })}
          </Select>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-8">
          <TextField
            error={!isValid.password}
            type="password"
            id="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={classes.textField}
          />
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-8">
          <Button onClick={handleRegisterClick}>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
