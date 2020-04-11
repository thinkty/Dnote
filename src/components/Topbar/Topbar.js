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
  IconButton,
  TextField,
  Tooltip,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
const iconList = require("../Icons/list.json");

export default class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNoteCallback: props.createNewNote,
      search: false,
      searchValue: "",
      onAddNew: false,
      title: "",
      content: "",
      lantool: "",
      reference: "",
    };
  }

  /**
   * Handler for searching functionality
   */
  onSearch = () => {
    alert("yeet");
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

  /**
   * Handler for adding a new note
   */
  toggleAddNewNote = () => {
    this.setState({
      onAddNew: !this.state.onAddNew,
    });
  };

  /**
   * Handler for changes on new note creation
   *
   * @param  event
   */
  onNewNoteChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  /**
   * Special case for handling lantool change
   *
   * @param  value  modified value for lantool
   */
  onLantoolChange = (value) => {
    this.setState({
      lantool: value,
    });
  };

  /**
   * Handler for submitting the new note
   */
  onSubmit = () => {
    // Make sure none of the details are empty
    if (this.state.title === "") {
      alert("Title cannot be empty");
      return;
    }
    if (this.state.content === "") {
      alert("Content cannot be empty");
      return;
    }
    if (this.state.lantool === "") {
      alert("Please choose a language or tool");
      return;
    }

    // call the callback function for adding note
    this.state.createNoteCallback(this.state.title, this.state.content, this.state.lantool, this.state.reference);

    // close the dialog
    this.toggleAddNewNote();
  };

  /**
   * Handler for cancelling the creation of the new note
   */
  onCancel = () => {
    // reset the values
    this.setState({
      title: "",
      content: "",
      lantool: "",
      reference: "",
    });
    // close the dialog
    this.toggleAddNewNote();
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
            <Tooltip title="Settings" placement="left" arrow enterDelay={500}>
              <IconButton href="/home/profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120 120"
                  width="32px"
                  height="32px"
                >
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
            </Tooltip>
          </Grid>
          <Grid item>
            <form onSubmit={this.onSearch}>
              <TextField
                color="secondary"
                placeholder="Search..."
                onChange={this.onSearchChange}
                type="input"
              />
            </form>
          </Grid>
          <Grid item>
            <Tooltip
              title="Add New Note"
              placement="right"
              arrow
              enterDelay={500}
            >
              <IconButton onClick={this.toggleAddNewNote}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120 120"
                  width="40px"
                  height="40px"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="#6698FA"
                    fillOpacity="100"
                  />
                  <line
                    x1="40"
                    y1="60"
                    x2="80"
                    y2="60"
                    stroke="#fff"
                    strokeWidth="10"
                  />
                  <line
                    x1="60"
                    y1="40"
                    x2="60"
                    y2="80"
                    stroke="#fff"
                    strokeWidth="10"
                  />
                </svg>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Dialog open={this.state.onAddNew} onClose={this.toggleAddNewNote}>
          <DialogTitle>
            <Typography>New Note</Typography>
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus
              id="title"
              required
              color="secondary"
              margin="normal"
              label="Title"
              type="text"
              fullWidth
              onChange={this.onNewNoteChange}
              value={this.state.title}
            />
            <TextField
              id="content"
              required
              variant="outlined"
              color="secondary"
              margin="normal"
              label="Content"
              type="text"
              fullWidth
              multiline
              rows="3"
              rowsMax="10"
              onChange={this.onNewNoteChange}
              value={this.state.content}
            />
            <Autocomplete
              id="lantool"
              autoHighlight
              options={iconList}
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => {
                if (newValue == null) {
                  this.onLantoolChange("");
                  return;
                }
                this.onLantoolChange(newValue.title);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Language or Tool"
                  color="secondary"
                />
              )}
            />
            <TextField
              id="reference"
              color="secondary"
              margin="normal"
              label="Reference"
              type="text"
              fullWidth
              onChange={this.onNewNoteChange}
              value={this.state.reference}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.onCancel} color="inherit">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.onSubmit}
              color="secondary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}
