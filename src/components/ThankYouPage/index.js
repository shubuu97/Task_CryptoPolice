import React from "react";
import axios from "axios";
import classes from "./ThankYouPage.module.css";
import UserProfileCard from "../../widgets/UserProfileCard";
import _get from "lodash/get";
import { CircularProgress } from "@material-ui/core";
import RatingComponent from "../../widgets/Rating";
import InfoCard from "../../widgets/InfoCard";
import UserCommentCard from "../../widgets/UserCommentCard";
import Button from "@material-ui/core/Button";
import { primaryColor, secondaryColor } from "../../constants";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  button: {
    width: "40px",
    color: "white",
    backgroundColor: primaryColor,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: secondaryColor
    }
  }
});

class ThankYouPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: {
        userComments: [],
        domainRegistrationDate: "",
        domainExpirationDate: "",
        phishtankStatus: "",
        etherscamStatus: "",
        ratings: 0,
        trust: {
          color: "",
          value: ""
        }
      },
      isFetching: false,
      userCommentsToShow: [],
      showShowMoreButton: false,
      loadingComments: false
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    const { website } = this.props.formData;
    axios
      .post(
        "https://watchdog-api-v1.cryptopolice.com/api/verify?domain=https://google.com",
        {
          domain: website
        }
      )
      .then(res => {
        const { response } = res.data;
        const { responseData } = this.state;
        if (res.status == 200) {
          let updatedResponseData = {
            ...responseData,
            domainRegistrationDate: _get(
              response,
              "whois.payload.registration.value",
              "Not Found!"
            ),
            domainExpirationDate: _get(
              response,
              "whois.payload.expiration.value",
              "Not Found!"
            ),
            phishtankStatus: _get(
              response,
              "phishtank.payload.status.value",
              "Not Found!"
            ),
            etherscamStatus: _get(
              response,
              "etherscam.payload.status.value",
              "Not Found!"
            ),
            ratings: _get(response, "wot.payload.rating", 0),
            trust: {
              ...responseData.trust,
              value: _get(response, "wot.payload.trust.value", 0),
              color: _get(response, "wot.payload.trust.color", "")
            },
            userComments: _get(response, "wot.payload.comments", [])
          };
          const calUserCommentsToShow = () => {
            let userCommentsToShow = [];
            if (updatedResponseData.userComments.length > 2) {
              userCommentsToShow = updatedResponseData.userComments.slice(0, 2);
            } else {
              userCommentsToShow = updatedResponseData.userComments;
            }
            return userCommentsToShow;
          };
          this.setState({
            responseData: updatedResponseData,
            isFetching: false,
            userCommentsToShow: calUserCommentsToShow(),
            showShowMoreButton:
              updatedResponseData.userComments.length >
              calUserCommentsToShow().length
          });
        }
      })
      .catch(err => {
        this.setState({ isFetching: false });
        console.log(err);
      });
  }

  fetchComments = () => {
    this.setState({ loadingComments: true });
    const { userCommentsToShow } = this.state;
    const { userComments } = this.state.responseData;
    if (userComments.length <= userCommentsToShow.length) {
      this.setState({ showShowMoreButton: false, loadingComments: false });
    }
    if (userCommentsToShow.length === 2) {
      this.setState({
        userCommentsToShow: [
          ...userCommentsToShow,
          ...userComments.slice(
            userCommentsToShow.length,
            userComments.length < 10 ? userComments.length : 10
          )
        ],
        loadingComments: false
      });
    } else if (userCommentsToShow.length > 2) {
      this.setState({
        userCommentsToShow: [
          ...userCommentsToShow,
          ...userComments.slice(
            userCommentsToShow.length,
            userComments.length < userCommentsToShow.length + 10
              ? userComments.length
              : userCommentsToShow.length + 10
          )
        ],
        loadingComments: false
      });
    }
  };

  showResponseData = classes => {
    const {
      responseData,
      userCommentsToShow,
      showShowMoreButton,
      loadingComments
    } = this.state;
    return (
      <React.Fragment>
        <div className="text-center mt-3">
          <h5 className="mb-2">
            {responseData.ratings > 3 ? "Low Risk" : "High Risk"}
          </h5>
          <RatingComponent rating={responseData.rating} />
        </div>
        <InfoCard responseData={responseData} />
        <div>
          <h4>Trustworthiness: {responseData.trust.value} / 5.0</h4>
        </div>
        {userCommentsToShow &&
          userCommentsToShow.map(userComment => {
            console.log(userComment);
            return <UserCommentCard userComment={userComment} />;
          })}
        {showShowMoreButton ? (
          <div className="row form-group">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              {loadingComments ? (
                <CircularProgress />
              ) : (
                <Button
                  className={classes.button}
                  variant="outlined"
                  onClick={this.fetchComments}
                >
                  Show More
                </Button>
              )}
            </div>
            <div className="col-md-2"></div>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={`my-5 ${classes.container}`}>
        <div className="row">
          <div className="col-md-12">
            <h3 className={`text-center mb-4 ${classes.profileHeading}`}>
              Thank you! Your profile is created!
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <UserProfileCard {...this.props.formData} />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <div className={classes.breakHeading}>
              <h4>Your website {this.props.formData.website} analyses:</h4>
            </div>
          </div>
        </div>
        <div>
          {this.state.isFetching ? (
            <CircularProgress />
          ) : (
            this.showResponseData(classes)
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ThankYouPage);
