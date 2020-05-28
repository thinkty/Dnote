/**
 * This is the login page.
 * The user will enter his/her email and password for login
 *
 */

import React, { Component } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Snackbar,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import axios from "axios";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pw: "",
      successful: false,
      signup: false,
      notify: false,
      notification: "",
      severity: ""
    };

    // TODO: Auto login
  }

  /**
   * Encrypt current user and register a new session to cookie.
   * If successful, redirect the user to main feed page.
   * If not, display an error message.
   */
  registerNewUser = async () => {

    // TODO: for some reason, the getIP() is returning a undefined variable even if the ip address successfully prints on console
    this.alertWithMessage("Authentication successful", "success");

    // redirect in 500 ms
    setTimeout(() => {
      this.setState({
        successful: true,
      });
    }, 500);
    return;

    // get the ip address of the user
    // the ip address will be used for creating session id
    // eslint-disable-next-line
    let ip = await this.getIP();

    // check ip
    if (ip === null || typeof ip === "undefined" || ip.length <= 0) {
      console.log("ip : " + ip);
      this.alertWithMessage("Error while authenticating", "error");
      return;
    }

    // create session id with ip and email
    let tempSessionID = ip + "" + this.state.email;

    // encrypt
    console.log(document.cookie);
    console.log(tempSessionID);

    // TODO: create secure cookie for session (auto login)
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    // https://humanwhocodes.com/blog/2009/05/12/cookies-and-security/

    // redirection after successful authentication
    this.setState({
      successful: true,
    });
  };

  /**
   * This is a helper function to acquire the IP address of the client.
   * This method uses cloudflare's trace cgi to get the ip address.
   * As time progresses, it might not work in the future.
   *
   * @returns the ip address of the client on success and an empty string
   *          on failure.
   */
  getIP = async () => {
    await axios
      .get("https://www.cloudflare.com/cdn-cgi/trace")
      .then((response) => {
        // the response contains the ip address in plain text
        // extract using regex from response.data
        // supports both IPv4 and IPv6
        let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
        let results = ip_regex.exec(response.data);
        console.log(results[1]);
        return results[1];
      })
      .catch((error) => {
        this.alertWithMessage("Unable to use cdn-cgi/trace please contact developer", "error");
        console.error(error);
      });
  };

  /**
   * On change handler for input changes (email and password)
   */
  handleChange = (event) => {
    // based on the id, update email or pw
    if (event.target.id === "email") {
      this.setState({
        email: event.target.value,
        pw: this.state.pw,
      });
    } else if (event.target.id === "pw") {
      this.setState({
        email: this.state.email,
        pw: event.target.value,
      });
    } else {
      this.alertWithMessage("Error", "error");
    }
  };

  /**
   * Handle login button click and verification
   */
  handleLogin = (event) => {
    // prevent defualt behavior of form submit
    event.preventDefault();
    this.alertWithMessage("Authenticating", "info");

    // validate locally
    if (!this.validateEmailAndPW()) {
      return;
    }

    // authenticate
    axios
      .post("https://darc-backend.herokuapp.com/api-user/auth", {
        email: this.state.email,
        password: this.state.pw,
      })
      .then((response) => {
        // save encrypted user's sessionid
        // and redirect to main feed page
        this.registerNewUser();
      })
      .catch((error) => {
        // error from response
        if (
          typeof error.response !== "undefined" &&
          typeof error.response.data !== "undefined"
        ) {
          this.alertWithMessage(error.response.data, "error");
        }
        // error related to axios
        else {
          console.log({ error });
        }
      });
  };

  /**
   * This is a helper function to validate the input on a local level.
   * Inputs are email and password inputted by the user.
   *
   * @returns true if validation is successful
   */
  validateEmailAndPW = () => {
    // basic parameter validation (email, pw)
    if (!this.state.email.match(/[a-z0-9A-Z]+@[a-z0-9A-Z]+\.[a-z0-9A-Z]+/g)) {
      this.alertWithMessage("Email Incorrect", "error");
      return false;
    }
    if (this.state.pw.length < 8) {
      this.alertWithMessage("Password is too short", "error");
      return false;
    }
    // check alphanumeric
    if (!this.state.pw.match(/[0-9]+/g)) {
      this.alertWithMessage("Password must include atleast one number", "error");
      return false;
    }
    if (!this.state.pw.match(/[a-zA-Z]+/g)) {
      this.alertWithMessage("Password must include atleast one alphabet", "error");
      return false;
    }

    return true;
  };

  /**
   * Handle register link clicked.
   * Redirect the user to registration page.
   */
  handleRegister = () => {
    // redirection
    this.setState({
      signup: true,
    });
  };

  /**
   * Show alert with custom message.
   *
   * @param  message  the message to display on the alert
   * @param  severity type of alert
   */
  alertWithMessage = (message, severity) => {
    this.setState({
      notify: true,
      notification: message,
      severity: severity
    });
  };
  closeAlert = () => {
    this.setState({
      notify: false,
    });
  };

  // TODO: use https://material-ui.com/components/transitions/

  render() {
    if (this.state.successful) {
      return (
        <Redirect
          exact
          from="/"
          push
          to={{
            pathname: "/home",
            state: { email: this.state.email },
          }}
        />
      );
    }

    if (this.state.signup) {
      return <Redirect exact from="/" push to="/register" />;
    }

    return (
      <div>
        <Snackbar
          open={this.state.notify}
          autoHideDuration={3000}
          onClose={this.closeAlert}
        >
          <Alert variant="filled" onClose={this.closeAlert} severity={this.state.severity}>
            {this.state.notification}
          </Alert>
        </Snackbar>

        <Card 
          raised
          style={{
            width:"300px",
            margin: "auto",
            marginTop: "100px"
          }}  
        >
          <CardContent>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h2" align="center" gutterBottom>
                Darc
              </Typography>

              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs>
                  <form onSubmit={this.handleLogin}>
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      color="primary"
                      margin="dense"
                      value={this.state.email}
                      onChange={this.handleChange}
                      variant="filled"
                      required
                    />
                  </form>
                </Grid>
                <Grid item>
                  <form onSubmit={this.handleLogin}>
                    <TextField
                      id="pw"
                      label="Password"
                      type="password"
                      color="primary"
                      margin="dense"
                      value={this.state.pw}
                      onChange={this.handleChange}
                      variant="filled"
                      required
                    />
                  </form>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleLogin}
                  type="submit"
                >
                  <Typography align="center" color="textPrimary">
                    Login
                  </Typography>
                </Button>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={0}
              >
                <Grid item>
                  <Typography variant="caption" color="textSecondary">
                    Don't have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="text"
                    disableElevation
                    disableFocusRipple
                    onClick={this.handleRegister}
                  >
                    <Typography variant="caption" color="secondary">
                      Sign Up
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      
    );
  }
}
