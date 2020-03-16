/**
 * React component for notes
 * It should display the following contents:
 *  - title
 *  - content
 *  - language or tool
 *  - creation time
 *  - tags
 */

import React, { Component } from 'react';
import { Grid, Divider, SvgIcon } from '@material-ui/core';
import Icon from '../Icons';

export default class Post extends Component {

    constructor(props) {
        this.state = {
            title: props.title,
            content: props.content,
            lantool: props.lantool,
            time: props.time,
            tags: props.tags
        }
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Icon name={this.state.lantool}/>
                    </Grid>
                    <Divider/>
                    <Grid item xs={6}>
                        {/* The content */}
                    </Grid>
                    <Divider/>
                    <Grid item>
                        {/* Menu */}
                    </Grid>
                </Grid>
            </div>
        )
    }
}
