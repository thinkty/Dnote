/**
 * This is the main page to display all the notes that the user currently has created
 * Upon mounting, the client should make a request to the server for the current user's notes
 * 
 */

import React, { Component } from 'react';
import Topbar from '../Topbar';
import { AppBar, Grid } from '@material-ui/core';
import Note from '../Note';

export default class MainFeedPage extends Component {

    constructor(props) {
        super(props);

        // notes will be an array of note components
        this.state = {
            notes: []
        }
    }

    /**
     * Make a request to the server for notes of the current user
     */
    componentDidMount() {
        
        //TODO: Fetch from remote database

        // TODO: remove mock data
        let notes = [];
        let mockdata = require('../../mock.json');
        mockdata.forEach(note => {
            notes.push(<Note key={note.id} data={note}/>)
        });
        this.setState({
            notes: notes
        });
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
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
                >
                    {this.state.notes}
                </Grid>
            </Grid>
        )
    }
}
