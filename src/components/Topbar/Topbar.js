/**
 * This is the top bar component
 * This component contains :
 *  - Profile Icon where the user can control the settings
 *  - Search bar where the user can filter their notes
 *  - Add note button to add a new note
 *
 */

import React, { Component } from 'react';
import { Grid, Card, IconButton, TextField } from '@material-ui/core';


export default class Topbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: false,
            searchValue: ""
        }
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
                spacing={1}
                >
                    <Grid
                    item
                    >
                        <IconButton
                        href="/home/profile"
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
                        <IconButton
                        href="/home/add"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="40px" height="40px">
                                <circle cx="60" cy="60" r="55" fill="#6698FA" fillOpacity="100" />
                                <line x1="40" y1="60" x2="80" y2="60" stroke="#fff" strokeWidth="10" />
                                <line x1="60" y1="40" x2="60" y2="80" stroke="#fff" strokeWidth="10" />
                            </svg>
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}
