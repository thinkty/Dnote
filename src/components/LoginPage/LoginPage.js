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
            successful: false
        }

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
        }
        if (this.state.pw.length < 8) {
            alert('Password is too short');
        }
        //TODO: alphanumeric

        // TODO: implement the authentication part

        // redirection after successful authentication
        this.setState({
            successful: true
        });
    }




    render() {

        if (this.state.successful) {
            return <Redirect exact from="/" push to={{
                pathname: "/home",
                state: { email : this.state.email }
            }}/>;
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
                        spacing={1}
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
                                spacing={0}
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
                                    xs
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
                                    <Grid
                                    item
                                    xs
                                    >
                                        <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.handleLogin}
                                        >
                                            <Typography
                                            align="center"
                                            color="textPrimary"
                                            >
                                                Submit
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}
