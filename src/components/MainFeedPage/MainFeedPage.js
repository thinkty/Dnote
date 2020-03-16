/**
 * This is the main page to display all the notes that the user currently has created
 * Upon mounting, the client should make a request to the server for the current user's notes
 * 
 */

import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

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
            <div>
                <Typography
                variant="h1"
                >
                    Hi
                </Typography>
            </div>
        )
    }
}
