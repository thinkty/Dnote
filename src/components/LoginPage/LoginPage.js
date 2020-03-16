/**
 * This is the login page.
 * The user will enter his/her email and password for login
 * 
 */

import React, { Component } from 'react';
import { Grid, TextField, Typography, Button, Card, CardContent } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pw: "",
            successful: false,
            signup: false
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
                pw: this.state.pw
            });
        }
        else if (event.target.id === "pw") {
            this.setState({
                email: this.state.email,
                pw: event.target.value
            });
        }
        else {
            alert('Error');
        }

    }

    /**
     * Handle login button click and verification
     */
    handleLogin = () => {

        // basic parameter validation (email, pw)
        if (!this.state.email.match(/[a-z0-9A-Z]+@[a-z0-9A-Z]+.[a-z0-9A-Z]+/g)) {
            alert('Email Incorrect');
            this.setState({
                email: "",
                pw: this.state.pw
            });
            return;
        }
        if (this.state.pw.length < 8) {
            alert('Password is too short');
            this.setState({
                email: this.state.email,
                pw: ""
            });
            return;
        }
        //TODO: check alphanumeric

        //TODO: implement the authentication part

        // redirection after successful authentication
        this.setState({
            successful: true
        });
    }

    /**
     * Handle register link clicked
     */
    handleRegister = () => {

        // redirection
        this.setState({
            signup: true
        });
    }


    render() {

        if (this.state.successful) {
            return <Redirect exact from="/" push to={{
                pathname: "/home",
                state: { email : this.state.email }
            }}/>;
        }

        if (this.state.signup) {
            return <Redirect exact from="/" push to="/signup" />;
        }

        return (
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
                <Card
                raised
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
                            <Typography
                            variant="h2"
                            align="center"
                            gutterBottom
                            >
                            Darc
                            </Typography>
                            <form>
                                <Grid
                                item
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                >
                                    <Grid
                                    item
                                    xs
                                    >
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
                                    </Grid>
                                    <Grid
                                    item
                                    
                                    >
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
                                        helperText="more than 8 alphanumeric"
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                            <Grid
                            item
                            >
                                <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.handleLogin}
                                type="submit"
                                >
                                    <Typography
                                    align="center"
                                    color="textPrimary"
                                    >
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
                                <Grid
                                item
                                >
                                    <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    >
                                        Don't have an account?
                                    </Typography>
                                </Grid>
                                <Grid
                                item
                                >   
                                    <Button
                                    variant="text"
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
        )
    }
}
