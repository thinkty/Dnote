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
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  Backdrop,
} from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Autocomplete, SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Redirect } from "react-router-dom";
const iconList = require("../Icons/list.json");


export default class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNoteCallback: props.createNewNote,
      toggleMenu: false,
      toProfilePage: false,
      search: false,
      searchValue: "",
      onAddNew: false,
      title: "",
      content: "",
      lantool: "",
      reference: "",
      actions: [
        {
          icon: <CreateIcon color="secondary" />,
          name: "Create New Note",
          onClick: this.toggleAddNewNote
        },
        { 
          icon: <PersonIcon color="secondary" />,
          name: "Manage Account",
          onClick: this.toProfilePage
        },
        { 
          icon: <ExitToAppIcon color="secondary" />,
          name: "Logout",
          onClick: this.handleLogout
        },
      ],
    };
  }



  /**
   * Handler for searching functionality
   */
  onSearch = () => {
    alert("yeet");
  };

  /**
   * Handler for logging out from the application
   */
  handleLogout = () => {
    // TODO: handle logout
    console.log("Logging out!");
  }

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

  /**
   * Helper function for opening and closing the speed dial menu
  */
  openMenu = () => {
    this.setState({
      toggleMenu: true
    });
  }
  closeMenu = () => {
    this.setState({
      toggleMenu: false
    });
  }

  /**
   * Handler for redirecting the user to the profile management page
   */
  toProfilePage = () => {
    this.setState({
      toProfilePage: true
    });
  }

  render() {

    // redirection to the profile page
    if (this.state.toProfilePage) {
      return <Redirect from="/home" push to="/home/profile" />
    }

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
            <Backdrop open={this.state.toggleMenu}/>
            <SpeedDial
              ariaLabel="Application menu"
              FabProps={{color: "secondary"}}
              icon={<AppsIcon fontSize="large" style={{color: "#ffffff"}}/>}
              direction="right"
              onClose={this.closeMenu}
              onOpen={this.openMenu}
              open={this.state.toggleMenu}
            >
              {
                this.state.actions.map((action) => (
                  <SpeedDialAction 
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                  />
                ))
              }
            </SpeedDial>
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
