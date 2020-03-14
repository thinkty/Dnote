/**
 * This is the login page.
 * The user will enter his/her email and password for login
 * 
 */

import React, { Component } from 'react';
import { Grid, Paper, TextField, Divider, InputLabel, Typography } from '@material-ui/core';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pw: ""
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


    render() {
        return (
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
                <Paper
                elevation={3}>
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
                            xs
                            >
                                <TextField
                                id="email"
                                label="Email"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                variant="outlined"
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
                                value={this.state.pw}
                                onChange={this.handleChange}
                                variant="outlined"
                                required
                                helperText="more than 8 alphanumeric"
                                />
                            </Grid>
                        </form>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}
