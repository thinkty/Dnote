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
  Snackbar
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
      notification: ""
    };

    // TODO: Auto login
  }

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
      this.alert("Error");
    }
  };

  /**
   * Handle login button click and verification
   */
  handleLogin = (event) => {
    // prevent defualt behavior of form submit
    event.preventDefault();

    // basic parameter validation (email, pw)
    if (!this.state.email.match(/[a-z0-9A-Z]+@[a-z0-9A-Z]+\.[a-z0-9A-Z]+/g)) {
      this.alert("Email Incorrect");
      return;
    }
    if (this.state.pw.length < 8) {
      this.alert("Password is too short");
      return;
    }
    // check alphanumeric
    if (!this.state.pw.match(/[0-9]+/g)) {
      this.alert("Password must include atleast one number");
      return;
    }
    if (!this.state.pw.match(/[a-zA-Z]+/g)) {
      this.alert("Password must include atleast one alphabet");
      return;
    }

    // authenticate
    axios.post("https://darc-backend.herokuapp.com/api-user/auth", {
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
      this.alert(error.response.data);
    });
  };

  /**
   * Handle register link clicked
   */
  handleRegister = () => {
    // redirection
    this.setState({
      signup: true,
    });
  };

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
      <Grid container direction="column" justify="center" alignItems="center">
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
                  <Typography 
                    variant="caption" 
                    color="textSecondary"
                  >
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
                    <Typography 
                      variant="caption" 
                      color="secondary"
                    >
                      Sign Up
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
