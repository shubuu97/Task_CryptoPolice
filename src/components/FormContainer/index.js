import React, { Component } from "react";
import Stepper from "react-stepper-horizontal";
import RegistrationForm from "../RegistrationForm";
import SecurityCodeForm from "../SecurityCodeForm";
import UserProfileForm from "../UserProfileForm";
import { primaryColor, secondaryColor } from "../../constants";
import localForage from "localforage";
import _isEmpty from "lodash/isEmpty";

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
        country: "IN",
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
        avatar: true
      }
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

  handleFileDrop = () => {};

  renderForm = () => {
    const { activeStep, formData, isValid } = this.state;
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
            isValid={isValid}
            handleInputChange={this.handleInputChange}
            handleFileDrop={this.handleFileDrop}
            goToPrevStep={this.goToPrevStep}
            handleCreateProfileClick={this.handleSubmit}
          />
        );
      //   case 4:
      //     const {
      //       name,
      //       category,
      //       email,
      //       country,
      //       intlPhoneInput,
      //       website,
      //       avatar
      //     } = formData;
      //     return (
      //       <ThankYouPage
      //         avatar={avatar.value}
      //         name={name.value}
      //         category={category.value}
      //         email={email.value}
      //         country={country.value}
      //         intlPhoneInput={intlPhoneInput.value}
      //         website={website.value}
      //       />
      //     );
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
