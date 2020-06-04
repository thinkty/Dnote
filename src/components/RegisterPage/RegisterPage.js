/**
 * This is the register page.
 * The user will enter his/her email and password for registering a new account
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

export default class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pw: "",
      successful: false,
      signin: false,
      notify: false,
      notification: "",
    };
  }

  /**
   * On change handler for input changes (email and password)
   */
  handleChange = (event) => {
    // based on the id, update email or pw
    if (event.target.id === "username") {
      this.setState({
        email: event.target.value,
        pw: this.state.pw,
      });
    } else if (event.target.id === "password") {
      this.setState({
        email: this.state.email,
        pw: event.target.value,
      });
    }
  };

  /**
   * Handle login button click and verification
   */
  handleRegister = (event) => {
    // prevent defualt behavior of form submit
    event.preventDefault();

    // basic parameter validation (email, pw)
    if (!this.validateEmailAndPW()) {
      return;
    }
    
    // send to server
    axios.post("https://darc-backend.herokuapp.com/api-user/register", {
      email: this.state.email,
      password: this.state.pw
    })
    .then((response) => {
      setTimeout(() => {
        // redirection after successful authentication
        this.setState({
          successful: true,
        });
      }, 1000);
    })
    .catch((error) => {
      // error from response
      if (typeof error.response !== 'undefined' &&
          typeof error.response.data !== 'undefined') {
        this.alert(error.response.data);
      }
      // error related to axios
      else {
        console.log({error});
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
      this.alert("Email Incorrect");
      return false;
    }
    if (this.state.pw.length < 8) {
      this.alert("Password is too short");
      return false;
    }
    // check alphanumeric
    if (!this.state.pw.match(/[0-9]+/g)) {
      this.alert("Password must include atleast one number");
      return false;
    }
    if (!this.state.pw.match(/[a-zA-Z]+/g)) {
      this.alert("Password must include atleast one alphabet");
      return false;
    }

    return true;
  }

  /**
   * Show alert with custom message
   * 
   * @param  message  the message to display on the alert
   */
  alert = (message) => {
    this.setState({
      notify: true,
      notification: message
    });
  }
  closeAlert = () => {
    this.setState({
      notify: false
    });
  }

  /**
   * Handle login link clicked
   */
  handleLogin = () => {
    // redirection
    this.setState({
      signin: true,
    });
  };

  render() {
    if (this.state.successful) {
      return (
        <Redirect
          exact
          from="/register"
          push
          to={{
            pathname: "/home",
            state: { email: this.state.email },
          }}
        />
      );
    }

    if (this.state.signin) {
      return <Redirect exact from="/register" push to="/" />;
    }

    return (
      <Grid 
        container 
        direction="column" 
        justify="center" 
        alignItems="center"
      >
        <Snackbar
          open={this.state.notify}
          autoHideDuration={3000}
          onClose={this.closeAlert}
        >
          <Alert
            variant="filled"
            onClose={this.closeAlert}
            severity="error"
          >
            {this.state.notification}
          </Alert>
        </Snackbar>
        <Card raised>
          <CardContent>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Typography 
                variant="h2" 
                align="center" 
                gutterBottom
              >
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
                  <form onSubmit={this.handleRegister}>
                    <TextField
                      id="username"
                      label="Email"
                      type="text"
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
                  <form onSubmit={this.handleRegister}>
                    <TextField
                      id="password"
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
                  onClick={this.handleRegister}
                  type="submit"
                >
                  <Typography align="center" color="textPrimary">
                    Register
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
                  <Typography 
                    variant="caption" 
                    color="textSecondary"
                  >
                    Already have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Button 
                    variant="text" 
                    disableElevation
                    disableFocusRipple
                    onClick={this.handleLogin}
                  >
                    <Typography 
                      variant="caption" 
                      color="secondary"
                    >
                      Sign In
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
