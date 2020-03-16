/**
 * React component for notes
 * It should display the following contents:
 *  - title
 *  - content
 *  - language or tool
 *  - creation time
 *  - reference
 *  - tags
 */

import React, { Component } from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import Icon from '../Icons';

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.data.title,
            content: props.data.content,
            lantool: props.data.lantool,
            time: props.data.time,
            reference: props.data.reference,
            tags: props.data.tags
        }
    }

    render() {
        return (
            <div>
                <Grid
                    item
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Card
                    raised
                    >
                        <CardContent>
                            <Grid 
                            item
                            >
                                <Icon name={this.state.lantool}/>
                            </Grid>
                            <Grid 
                            item
                            >
                                <Typography>
                                    {this.state.content}
                                </Typography>
                            </Grid>
                            <Grid 
                            item
                            >
                                <h1>menu</h1>
                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>
            </div>
        )
    }
}
