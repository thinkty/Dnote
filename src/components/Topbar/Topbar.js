/**
 * This is the top bar component
 * This component contains :
 *  - Profile Icon where the user can control the settings
 *  - Search bar where the user can filter their notes
 *  - Add note button to add a new note
 *
 */

import React, { Component } from "react";
import {
  Grid,
  Card,
  TextField,
  Fade,
} from "@material-ui/core";


export default class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNoteCallback: props.createNewNote,
      toggleMenu: false,
      toProfilePage: false,
      isSearchEnabled: false,
      searchValue: "",
      onAddNew: false,

    };
  }

  /**
   * Handler for searching functionality
   * 
   * @param event
   */
  onSearch = (event) => {
    // prevent page from refreshing
    event.preventDefault();
    alert(this.state.searchValue);
  };

  /**
   * Handler for updating the search value (controlled component)
   *
   * @param  event
   */
  onSearchChange = (event) => {
    // update search value
    this.setState({
      searchValue: event.target.value,
    });
  };

  render() {

    return (
      <Card raised>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Fade in={this.state.isSearchEnabled}>
              <form onSubmit={this.onSearch}>
                <TextField
                  color="secondary"
                  placeholder="Search..."
                  onChange={this.onSearchChange}
                  type="input"
                />
              </form>
            </Fade>
          </Grid>
        </Grid>
      </Card>
    );
  }
}
