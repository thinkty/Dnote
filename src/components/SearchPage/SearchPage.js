import React, { Component } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


export default class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      alertMessage: "",
      alertType: "",
    }
  }


  /**
   * Helper method to load the script required for the Google Custom Search
   */
  async componentDidMount() {

    let customSearch = document.createElement("script");
    customSearch.type = "text/javascript";
    customSearch.async = true;

    // on localhost
    if (process.env.CX === undefined) {
      const secret = require("../../cx.json");
      customSearch.src = "https://cse.google.com/cse.js?cx=" + secret.cx;
    }
    // on hosted
    else {
      customSearch.src = "https://cse.google.com/cse.js?cx=" + process.env.CX;
    }
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(customSearch, s);
  }

  /**
   * Helper function to show the user a custom alert with the desired message
   *
   * @param  message  the message to show the user
   * @param  type     alert severity: error, warning, info, success
   */
  alertWithText = (message, type) => {
    this.setState({
      alert: true,
      alertMessage: message,
      alertType: type,
    });
  };


  render() {
    return (
      <div>
        <div className="gcse-search"/>

        <Snackbar
          open={this.state.alert}
          autoHideDuration={3000}
          onClose={this.dismissAlert}
          onClick={this.dismissAlert}
        >
          <Alert
            severity={this.state.alertType}
            onClose={this.dismissAlert}
            variant="filled"
          >
            {this.state.alertMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
