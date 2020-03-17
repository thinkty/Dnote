/**
 * React component for notes
 * It should display the following contents:
 *  - title
 *  - content
 *  - language or tool
 *  - creation time
 *  - reference
 */

import React, { Component } from 'react';
import { Grid, Typography, IconButton, Divider, Paper } from '@material-ui/core';
import Icon from '../Icons';


export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.data.title,
            content: props.data.content,
            lantool: props.data.lantool,
            time: props.data.time,
            reference: props.data.reference
        }
    }

    /**
     * Helper function to get the time format from the given time in miliseconds
     */
    getTime = (time) => {
        let date = new Date(time);
        return (date.getMonth()+1 < 10 ? "0" : "") + (date.getMonth()+1) + "/" + date.getDate();
    }

    render() {
        return (
                <Paper
                elevation={2}
                style={{
                    width: '800px'
                }}
                >
                        <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={4}
                        >
                            <Grid
                            item
                            >
                                <Icon name={this.state.lantool}/>
                            </Grid>
                            <Divider
                            orientation="vertical"
                            flexItem
                            />
                            <Grid
                            item
                            xs={9}
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-start"
                            spacing={1}
                            >
                                <Grid
                                item
                                >
                                    <Typography
                                    variant="h6"
                                    >
                                        {this.state.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                item
                                >
                                    <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    >
                                        {this.getTime(this.state.time)}
                                    </Typography>
                                </Grid>
                                <Grid
                                item
                                >
                                    <Typography>
                                        {this.state.content}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider
                            orientation="vertical"
                            flexItem
                            />
                            <Grid
                            item
                            >
                                <IconButton>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="40px" height="40px">
                                        <line x1="0" y1="30" x2="120" y2="30" stroke="#6698FA" strokeWidth="10" />
                                        <line x1="0" y1="60" x2="120" y2="60" stroke="#6698FA" strokeWidth="10" />
                                        <line x1="0" y1="90" x2="120" y2="90" stroke="#6698FA" strokeWidth="10" />
                                    </svg>
                                </IconButton>
                            </Grid>
                        </Grid>
                </Paper>
        )
    }
}
