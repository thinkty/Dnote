/**
 * This react component handles the reference link
 */

import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { getMetadata } from "page-metadata-parser";
const domino = require("domino");


export default class Reference extends Component {

  constructor(props) {
    super(props);
    this.state = {
      link: props.link,
      image: "",
      title: "",
      description: ""
    };
  }

  async componentDidMount() {
    // Get the metadata from the given link
    const response = await fetch("https://cors-anywhere.herokuapp.com/" + this.state.link);
    const html = await response.text();
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, this.state.link);

    // update the props
    this.setState({
      image: metadata.image,
      title: metadata.title,
      description: metadata.description
    });
  }

  /**
   * Helper function to redirect to the reference link
   */
  toReference = () => {
    window.location = this.state.link;
  };

  render() {
    return (
      <Paper
        elevation={5}
        variant="elevation"
        onClick={this.toReference}
        style={{cursor: "pointer", width: "100%"}}
      >
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid 
            item 
            style={{width: "10%"}}
          >
            <img 
              src={this.state.image} 
              alt="metatag for reference"
              width="100%" 
              height="100%" 
              style={{filter: "grayscale(100%)"}}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            style={{width: "80%", textOverflow: "ellipsis", overflow: "hidden"}}
          >
            <Grid item>
              <Typography
                noWrap
                gutterBottom
                variant="body2"
                style={{color: "#A9A9A9"}}
              >
                {this.state.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                noWrap
                variant="caption"
                style={{color: "#808080"}}
              >
                {this.state.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

    );
  }
}
