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

        // notes    = array of note components
        // notesMap = array of keys for notes for accessing the note easibly
        this.state = {
            notes: [],
            notesMap: []
        }
    }

    /**
     * Helper function to remove the child component (note)
     * TODO: replace time with _id
     */
    detonate = (time) => {
        let notes = this.state.notes;
        let notesMap = this.state.notesMap;

        // find the note with the correct key
        for (let i = 0; i < notesMap.length; i++) {
            if (notesMap[i] === time.toString()) {
                // remove the current index from both map and array
                notesMap.splice(i, 1);
                notes.splice(i, 1);
                break;
            }
        }

        // update the state
        this.setState({
            notes: notes,
            notesMap: notesMap
        });
    }

    /**
     * Make a request to the server for notes of the current user
     */
    componentDidMount() {
        
        //TODO: Fetch from remote database

        // TODO: remove mock data
        let notes = [];
        let notesMap = [];
        let mockdata = require('../../mock.json');
        mockdata.forEach(note => {
            // TODO: Replace time with _id
            notes.push(
                <Note key={note.time.toString()}  data={note} detonate={this.detonate}/>
            )
            notesMap.push(note.time.toString());
        });
        this.setState({
            notes: notes,
            notesMap: notesMap
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
