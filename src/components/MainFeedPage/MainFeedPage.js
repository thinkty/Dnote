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
     * Helper function to remove the child component (note)
     */
    detonate = (key) => {
        let notes = this.state.notes;
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
            notes.push(
                <Grid 
                item 
                xs={12}
                style={{width: "80%", minWidth: "360px", maxWidth: "800px"}}
                >
                    <Note key={note.id} data={note} detonate={this.detonate}/>
                </Grid>)
        });
        this.setState({
            notes: notes
        });
    }
    
    render() {
        return (
            <div>
                <AppBar
                color="transparent"
                >
                    <Topbar/>
                </AppBar>
                <br/><br/><br/><br/><br/>
                <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={1}
                >
                    {this.state.notes}
                </Grid>
            </div>
        )
    }
}
