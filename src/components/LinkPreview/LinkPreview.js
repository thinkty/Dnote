/**
 * This react component handles the reference link
 */

import React, { Component } from "react";
import { Grid, Typography, Paper, } from "@material-ui/core";
import { getMetadata } from "page-metadata-parser";
const domino = require('domino');
const psl = require('psl');

export default class LinkPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      link: props.link,
      title: "",
      description: "",
      hostname: ""
    };
  }

  /**
   * Get the metadata from the given link on component mount.
   * Request the html of the given link and parse the metadata from it.
   */
  componentDidMount() {

    fetch("https://private-cors-anywhere.herokuapp.com/" + this.state.link)
    .then(async response => {

      // get the html and extract the metadata
      const html = await response.text();
      const doc = domino.createWindow(html).document;
      const metadata = getMetadata(doc, this.state.link);

      // update the props
      this.setState({
      title: metadata.title,
      description: metadata.description,
      hostname: "[" + psl.get(this.extractHostname(this.state.link)) + "]"
    });
    })
    .catch(error => {
      console.error({error});
    });
  }

  /**
   * This is a helper function to extract the hostname from a given link
   * 
   * @param url is the url to the given link
   * @returns the parsed hostname
   */
  extractHostname = (url) => {

    let hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
    }
    else {
      hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }

  render() {
    return (
      <a 
        href={this.state.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{width: "100%", textDecoration: "none"}}
      >
        <Paper
          variant="outlined"
          style={{
            cursor: "pointer", 
            width: "100%",
          }}
        >
          <Grid 
            container 
            direction="row" 
            justify="flex-start" 
            alignItems="center"
            style={{
              margin: "10px"
            }}
          >
            <Grid
              // Grid container for meta tags
              item
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              style={{width: "95%", textOverflow: "ellipsis", overflow: "hidden"}}
            >
              <Grid 
                // Grid container for linke title and hostname
                item
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <Typography
                    noWrap
                    gutterBottom
                    variant="body2"
                    style={{color: "#32CD32"}}
                  >
                    {this.state.hostname}
                  </Typography>
                </Grid>
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
              <Grid item>
                <Typography
                  noWrap
                  variant="caption"
                  style={{color: "#808080"}}
                >
                  {this.state.link}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </a>
    );
  }
}
