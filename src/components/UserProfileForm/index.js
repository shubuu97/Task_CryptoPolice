import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import countryList from "../../utility/countrieslist";
import { primaryColor, secondaryColor } from "../../constants";
import styles from "./UserProfileForm.module.css";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const ColorCircularProgress = withStyles({
  root: {
    color: primaryColor,
    marginTop: "10px"
  }
})(CircularProgress);

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

const UserProfileForm = props => {
  const {
    formData,
    isValid,
    handleInputChange,
    handleFileDrop,
    handleCreateProfileClick,
    goToPrevStep,
    avatarName,
    uploadingImage
  } = props;
  const { name, website } = isValid;
  const classes = useStyles();
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center mb-4">Complete your user profile</h3>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <TextField
            error={!name}
            name="name"
            id="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            className={classes.textField}
          />
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <TextField
            error={!website}
            name="website"
            id="website"
            label="Website"
            value={formData.website}
            onChange={handleInputChange}
            className={classes.textField}
          />
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <Select
            autoWidth
            value={formData.country}
            onChange={handleInputChange}
            disableEmpty
            className={classes.select}
            renderValue={value => formData.country}
            inputProps={{
              name: "country",
              id: "country"
            }}
          >
            {countryList.map(country => {
              return <MenuItem value={country}>{country}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <Dropzone
            onDrop={handleFileDrop}
            accept="image/*"
            onDropRejected={() => {
              alert("Please select a image file!");
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className={styles.reactDropzone}>
                  <input {...getInputProps()} />
                  <i class="fa fa-upload" aria-hidden="true"></i>
                  <h6>Drag and drop file here or click to upload</h6>
                </div>
                <p className={styles.avatarName}>
                  {uploadingImage ? (
                    <ColorCircularProgress />
                  ) : (
                    <span>
                      {avatarName}
                      {avatarName ? " uploaded successfully!" : ""}
                    </span>
                  )}
                </p>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row form-group">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <Button
            disabled={
              !(
                formData.name &&
                formData.website &&
                formData.country &&
                formData.avatar &&
                name &&
                website
              )
            }
            className={classes.saveButton}
            variant="outlined"
            onClick={handleCreateProfileClick}
          >
            Create your profile
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

export default UserProfileForm;
