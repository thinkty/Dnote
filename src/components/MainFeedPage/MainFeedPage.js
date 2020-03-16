/**
 * This is the main page to display all the notes that the user currently has created
 * Upon mounting, the client should make a request to the server for the current user's notes
 * 
 */

import React, { Component } from 'react';
import Topbar from '../Topbar';
import { AppBar, Grid } from '@material-ui/core';

export default class MainFeedPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }
    }

    /**
     * Make a request to the server for notes of the current user
     */
    componentDidMount() {
        
    }
    
    render() {
        return (
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
                <AppBar
                color="transparent"
                >
                    <Topbar/>
                </AppBar>
                <Grid
                item
                xs
                >
                    <br/><br/><br/><br/>
                </Grid>
                <Grid
                item
                xs
                >
                    <h1>hello</h1>
                </Grid>
            </Grid>
        )
    }
}
