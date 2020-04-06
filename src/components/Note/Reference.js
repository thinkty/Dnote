/**
 * This react component handles the reference link
 */

import React, { Component } from 'react'
import { IconButton, Grid, Typography } from '@material-ui/core';

export default class Reference extends Component {

    constructor(props) {
        super(props);
        this.state = {
            link: props.link
        };
    }

    /**
     * Helper function to redirect to the reference link
     */
    toReference = () => {
        window.location=this.state.link;
    }

    render() {
        return (
            <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            >
                <Grid
                item
                >
                    <IconButton
                    onClick={this.toReference}
                    >
                        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.77031 1.76047L6.23031 0.480469L0.820312 7.00047L6.23031 13.5205L7.77031 12.2405L3.42031 7.00047L7.77031 1.76047ZM7.00031 8.00047H9.00031V6.00047H7.00031V8.00047ZM15.0003 6.00047H17.0003V8.00047H15.0003V6.00047ZM11.0003 8.00047H13.0003V6.00047H11.0003V8.00047ZM16.2303 1.76047L17.7703 0.480469L23.1803 7.00047L17.7703 13.5205L16.2303 12.2405L20.5803 7.00047L16.2303 1.76047Z" fill="#6698FA"/>
                        </svg>
                    </IconButton>
                </Grid>
                <Grid
                item
                >
                    <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    >
                        {this.state.link}
                    </Typography>
                </Grid>
            </Grid>
        )
    }
}
