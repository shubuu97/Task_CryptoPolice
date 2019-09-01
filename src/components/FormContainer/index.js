import React, { Component } from "react";
import Stepper from "react-stepper-horizontal";
import RegistrationForm from "../RegistrationForm";
import SecurityCodeForm from "../SecurityCodeForm";
import UserProfileForm from "../UserProfileForm";
import ThankYouPage from "../ThankYouPage";
import { primaryColor, secondaryColor } from "../../constants";
import localForage from "localforage";
import _isEmpty from "lodash/isEmpty";
import { storage } from "../../firebase";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        { title: "Register" },
        { title: "Security Code" },
        { title: "User profile" },
        { title: "Thank you" }
      ],
      activeStep: 1,
      formData: {
        email: "",
        phoneNumber: "",
        category: "frontend",
        password: "",
        agreeCheck: false,
        securityCode: "",
        name: "",
        website: "",
        country: "India",
        avatar: ""
      },
      isValid: {
        email: true,
        phoneNumber: true,
        category: true,
        password: true,
        agreeCheck: false,
        securityCode: true,
        name: true,
        website: true,
        country: true,
        avatar: false
      },
      avatarName: "",
      uploadingImage: false
    };

    localForage.getItem("isValid", (error, isValid) => {
      if (!_isEmpty(isValid)) {
        this.setState({ isValid });
      }
    });

    localForage.getItem("formData", (error, formData) => {
      if (!_isEmpty(formData)) {
        this.setState({ formData });
      }
    });

    localForage.getItem("activeStep", (error, activeStep) => {
      if (activeStep) {
        this.setState({ activeStep });
      }
    });

    localForage.getItem("avatarName", (error, avatarName) => {
      if (avatarName) {
        this.setState({ avatarName });
      }
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    const { formData, isValid } = this.state;
    let updatedIsValid = { ...isValid, [name]: false };
    this.setState({ isValid: updatedIsValid }, () => {
      localForage.setItem("isValid", this.state.isValid);
    });
    if (name === "email") {
      let isValidEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value
      );
      if (value && isValidEmail) {
        updatedIsValid = { ...isValid, [name]: true };
        this.setState({ isValid: updatedIsValid }, () => {
          localForage.setItem("isValid", this.state.isValid);
        });
      }
    } else if (name === "website") {
      const isValidWebsite = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
        value
      );
      if (value && isValidWebsite) {
        updatedIsValid = { ...isValid, [name]: true };
        this.setState({ isValid: updatedIsValid }, () => {
          localForage.setItem("isValid", this.state.isValid);
        });
      }
    } else if (value) {
      updatedIsValid = { ...isValid, [name]: true };
      this.setState({ isValid: updatedIsValid }, () => {
        localForage.setItem("isValid", this.state.isValid);
      });
    }
    let updatedFormData = { ...formData, [name]: value };
    this.setState({ formData: updatedFormData }, () => {
      localForage.setItem("formData", this.state.formData);
    });
  };

  handleCheckboxChange = event => {
    const { name, checked } = event.target;
    const { formData, isValid } = this.state;
    let updatedIsValid = { ...isValid, [name]: false };
    this.setState({ isValid: updatedIsValid }, () => {
      localForage.setItem("isValid", this.state.isValid);
    });
    if (checked) {
      updatedIsValid = { ...isValid, [name]: true };
      this.setState({ isValid: updatedIsValid }, () => {
        localForage.setItem("isValid", this.state.isValid);
      });
    }
    let updatedFormData = { ...formData, [name]: checked };
    this.setState({ formData: updatedFormData }, () => {
      localForage.setItem("formData", this.state.formData);
    });
  };

  handlePhoneNoChange = (isValidPhoneNumber, value, countryData) => {
    const { formData, isValid } = this.state;
    let updatedIsValid = { ...isValid, phoneNumber: isValidPhoneNumber };
    let updatedFormData = { ...formData, phoneNumber: value };
    this.setState(
      { formData: updatedFormData, isValid: updatedIsValid },
      () => {
        localForage.setItem("formData", this.state.formData);
        localForage.setItem("isValid", this.state.isValid);
      }
    );
  };

  handleFileDrop = files => {
    this.setState({ uploadingImage: true });
    const { formData, isValid } = this.state;
    if (!_isEmpty(files[0].path)) {
      const uploadTask = storage.ref(`images/${files[0].name}`).put(files[0]);
      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log(snapshot);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(files[0].name)
            .getDownloadURL()
            .then(url => {
              let updatedIsValid = { ...isValid, avatar: true };
              this.setState({ isValid: updatedIsValid }, () => {
                localForage.setItem("isValid", this.state.isValid);
              });
              let updatedFormData = { ...formData, avatar: url };
              this.setState(
                {
                  formData: updatedFormData,
                  avatarName: files[0].name,
                  uploadingImage: false
                },
                () => {
                  localForage.setItem("formData", this.state.formData);
                  localForage.setItem("avatarName", this.state.avatarName);
                }
              );
            });
        }
      );
    }
  };

  handleSubmit = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 }, () => {
      localForage.setItem("activeStep", this.state.activeStep);
    });
  };

  goToPrevStep = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 }, () => {
      localForage.setItem("activeStep", this.state.activeStep);
    });
  };

  renderForm = () => {
    const {
      activeStep,
      formData,
      isValid,
      avatarName,
      uploadingImage
    } = this.state;
    switch (activeStep) {
      case 1:
        return (
          <RegistrationForm
            formData={formData}
            isValid={isValid}
            handleInputChange={this.handleInputChange}
            handlePhoneNoChange={this.handlePhoneNoChange}
            handleCheckboxChange={this.handleCheckboxChange}
            handleRegisterClick={this.handleSubmit}
          />
        );
      case 2:
        return (
          <SecurityCodeForm
            formData={formData}
            isValid={isValid}
            handleInputChange={this.handleInputChange}
            goToPrevStep={this.goToPrevStep}
            handleSaveBtnClick={this.handleSubmit}
          />
        );
      case 3:
        return (
          <UserProfileForm
            formData={formData}
            uploadingImage={uploadingImage}
            avatarName={avatarName}
            isValid={isValid}
            handleInputChange={this.handleInputChange}
            handleFileDrop={this.handleFileDrop}
            goToPrevStep={this.goToPrevStep}
            handleCreateProfileClick={this.handleSubmit}
          />
        );
      case 4:
        return <ThankYouPage formData={formData} />;
      default:
        return null;
    }
  };

  render() {
    const { steps, activeStep } = this.state;
    return (
      <>
        <Stepper
          steps={steps}
          defaultColor={primaryColor}
          completeColor={primaryColor}
          activeColor={secondaryColor}
          activeTitleColor={primaryColor}
          completeBarColor={primaryColor}
          defaultBorderWidth={50}
          activeStep={activeStep - 1}
        />
        <form>{this.renderForm()}</form>
      </>
    );
  }
}

export default FormContainer;
