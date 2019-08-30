import React, { Component } from "react";
import ApplicationLayout from "./hoc";
import FormContainer from "./components/FormContainer";

class App extends Component {
  render() {
    return <FormContainer />;
  }
}

export default ApplicationLayout(App);
