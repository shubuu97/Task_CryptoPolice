import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import countryList from "../../utility/countrieslist";

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

const UserProfileForm = props => {
  const {
    formData,
    isValid,
    handleInputChange,
    handleFileDrop,
    handleCreateProfileClick,
    goToPrevStep
  } = props;
  const classes = useStyles();
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center mb-4">Complete your user profile</h3>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-8">
          <TextField
            error={!isValid.name}
            name="name"
            id="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            className={classes.textField}
          />
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-8">
          <TextField
            error={!isValid.website}
            name="website"
            id="website"
            label="Website"
            value={formData.website}
            onChange={handleInputChange}
            className={classes.textField}
          />
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-8">
          <Select
            autoWidth
            value={formData.country}
            onChange={handleInputChange}
            disableEmpty
            inputProps={{
              name: "country",
              id: "country"
            }}
          >
            {countryList.map(countryOption => {
              const { name, value } = countryOption;
              return <MenuItem value={value}>{name}</MenuItem>;
            })}
          </Select>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-8">
          <Dropzone
            onDrop={acceptedFiles => handleFileDrop(acceptedFiles)}
            accept="image/*"
            onDropRejected={() => {
              alert("Please select a image file!");
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <h5>Drag and drop file here or click to upload</h5>
                  <i className="fa fa-file-image-o" />
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <Button
            variant="contained"
            handleClick={() => {
              handleCreateProfileClick("securitycode");
            }}
          >
            Create your profile
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <Button onClick={goToPrevStep}>Or go back!</Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
