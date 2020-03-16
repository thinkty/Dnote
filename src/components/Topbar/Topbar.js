/**
 * This is the top bar component
 * This component contains :
 *  - Profile Icon where the user can control the settings
 *  - Search bar where the user can filter their notes
 *  - Add note button to add a new note
 *
 */

import React, { Component } from 'react';
import { Grid, Card, IconButton, TextField, Typography, Button } from '@material-ui/core';


export default class Topbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toProfile: false,
            addNewNote: false,
            search: false,
            searchValue: ""
        }
    }

    /**
     * Handler for the profile button
     */
    onProfileClick = () => {

    }

    /**
     * Handler for search
     */
    onSearch = () => {
        alert('yeet');
    }

    /**
     * Handler for updating the search value (controlled component)
     */
    onSearchChange = (event) => {
        // update search value
        this.setState({
            searchValue : event.target.value
        });
    }


    render() {
        return (
            <Card
            raised
            >
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
                >
                    <Grid
                    item
                    >
                        <IconButton
                        onClick={this.onProfileClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="32px" height="32px">
                                <circle cx="20" cy="20" r="10" fill="#fff" />
                                <circle cx="60" cy="20" r="10" fill="#fff" />
                                <circle cx="100" cy="20" r="10" fill="#fff" />
                                <circle cx="20" cy="60" r="10" fill="#fff" />
                                <circle cx="60" cy="60" r="10" fill="#fff" />
                                <circle cx="100" cy="60" r="10" fill="#fff" />
                                <circle cx="20" cy="100" r="10" fill="#fff" />
                                <circle cx="60" cy="100" r="10" fill="#fff" />
                                <circle cx="100" cy="100" r="10" fill="#fff" />
                            </svg>
                        </IconButton>
                    </Grid>
                    <Grid
                    item
                    >
                        <form
                        onSubmit={this.onSearch}
                        >
                            <TextField
                            color="secondary"
                            placeholder="Search..."
                            onChange={this.onSearchChange}
                            type="input"
                            />
                        </form>
                    </Grid>
                    <Grid
                    item
                    >
                        <Button
                        color="secondary"
                        href="/home/add"
                        variant="contained"
                        >
                            <Typography
                            align="center"
                            color="textPrimary"
                            variant="body1"
                            >
                                New Note
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}
