import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ApplicationLayout = Component => {
  return class extends React.Component {
    render() {
      return (
        <Fragment>
          <Header />
          <Component />
          <Footer />
        </Fragment>
      );
    }
  };
};

export default ApplicationLayout;
