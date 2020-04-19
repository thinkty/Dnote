/**
 * This is the top bar component
 * This component contains :
 *  - Profile Icon where the user can control the settings
 *  - Search bar where the user can filter their notes
 *  - Add note button to add a new note
 *
 */

import React, { Component } from "react";
import { Grid, TextField } from "@material-ui/core";

export default class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchEnabled: this.props.enabled,
      textInputRef: React.createRef(),
      searchValue: "",
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
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <form onSubmit={this.onSearch}>
            <TextField
              color="secondary"
              placeholder="Search..."
              onChange={this.onSearchChange}
              type="input"
              inputRef={this.state.textInputRef}
            />
          </form>
        </Grid>
      </Grid>
    );
  }
}
