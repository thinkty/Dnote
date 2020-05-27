/**
 * This is the main page to display all the notes that the user currently has created
 * Upon mounting, the client should make a request to the server for the current user's notes
 *
 */

import React, { Component } from "react";
import {
  AppBar,
  Grid,
  Toolbar,
  Fade,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import {
  Autocomplete,
  SpeedDial,
  SpeedDialAction,
  Alert,
  SpeedDialIcon,
} from "@material-ui/lab";
import { Redirect } from "react-router-dom";
import AppsIcon from "@material-ui/icons/Apps";
import CreateIcon from "@material-ui/icons/Create";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import Note from "../Note";
import Topbar from "../Topbar";
const iconList = require("../Icons/list.json");

export default class MainFeedPage extends Component {
  constructor(props) {
    super(props);

    // TODO: https://material-ui.com/components/skeleton/ use skeleton as placeholders before getting notes from the server

    // TODO: make this big component into multiple sub components. As you can see, there are too many states in this single component.
    
    // notes    = array of note components
    // notesMap = array of keys for notes for accessing the note easibly
    this.state = {
      notes: [],
      notesMap: [],
      alert: false,
      alertType: "",
      alertMessage: "",
      toggleMenu: true,
      isSearchEnabled: false,
      enableTopbar: false,
      toProfilePage: false,
      onAddNew: false,
      title: "",
      content: "",
      lantool: "",
      reference: "",
      actions: [
        {
          icon: <CreateIcon color="secondary" />,
          name: "Create",
          onClick: this.toggleAddNewNote,
        },
        {
          icon: <SearchIcon color="secondary" />,
          name: "Search",
          onClick: this.enableSearch,
        },
        {
          icon: <FilterListIcon color="secondary"/>,
          name: "Filter",
          onClick: this.enableFilter,
        },
        {
          icon: <PersonIcon color="secondary" />,
          name: "Profile",
          onClick: this.toProfilePage,
        },
        {
          icon: <ExitToAppIcon color="secondary" />,
          name: "Logout",
          onClick: this.handleLogout,
        },
      ],
    };
  }

  /**
   * Make a request to the server for notes of the current user
   * upon loading the component.
   */
  componentDidMount() {
    //TODO: Fetch from remote database

    // TODO: remove mock data
    let notes = [];
    let notesMap = [];
    let mockdata = require("../../mock.json");
    mockdata.forEach((note) => {
      // TODO: Replace time with _id
      notes.push(
        <Note key={note.time.toString()} data={note} detonate={this.detonate} />
      );
      notesMap.push(note.time.toString());
    });

    this.setState({
      notes: notes,
      notesMap: notesMap,
    });
  }

  /**
   * This is a helper function that will be passed on to Topbar.
   * Topbar will call this function to add the notes visually
   * and also to the server.
   *
   * @param  title     title of the new note
   * @param  content   content of new note
   * @param  lantool   lantool related to new note
   * @param  reference reference related to new note
   */
  createNewNote = async (title, content, lantool, reference) => {
    let noteData = {
      title: title,
      content: content,
      lantool: lantool,
      time: new Date().getTime(),
      reference: reference,
    };
    // TODO: Send request to the server to add new note
    // TODO: do it synchronously

    // fetch the _id of the new note
    let _id = 69;

    // graphically update the notes
    // put the _id also as it is needed for modifying the ntoe
    noteData.id = _id;

    // add the new note to the state
    let notes = this.state.notes;
    notes.unshift(
      <Note
        key={noteData.time.toString()}
        data={noteData}
        detonate={this.detonate}
      />
    );
    // add the key also to the map
    let map = this.state.notesMap;
    map.unshift(noteData.time.toString()); // TODO: replace to id

    // setState to rerender to update mainfeedpage
    this.setState({
      notes: notes,
      notesMap: map,
    });
  };

  /**
   * Helper function to remove the child component (note)
   * TODO: replace time with _id
   *
   * @param  time  currently, we are distinguishing note by time (TODO: use _id)
   */
  detonate = (time) => {
    let notes = this.state.notes;
    let notesMap = this.state.notesMap;

    // find the note with the correct key
    for (let i = 0; i < notesMap.length; i++) {
      if (notesMap[i] === time.toString()) {
        // remove the current index from both map and array
        notesMap.splice(i, 1);
        notes.splice(i, 1);
        break;
      }
    }

    // update the state
    this.setState({
      notes: notes,
      notesMap: notesMap,
    });
  };

  /**
   * Handler for logging out from the application
   */
  handleLogout = () => {
    // TODO: handle logout
    this.alertWithText("Logout feature is not ready", "info");
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
   * @param  event  default event
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
   * Handler for submitting (creating) the new note
   */
  onSubmit = () => {
    // Make sure none of the details are empty
    if (this.state.title === "") {
      this.alertWithText("Title cannot be empty", "error");
      return;
    }
    if (this.state.content === "") {
      this.alertWithText("Content cannot be empty", "error");
      return;
    }
    if (this.state.lantool === "") {
      this.alertWithText("Please choose a language or tool", "error");
      return;
    }

    // call the function for adding note graphically and also in the server
    this.createNewNote(
      this.state.title,
      this.state.content,
      this.state.lantool,
      this.state.reference
    );

    // close the dialog for adding new note
    this.toggleAddNewNote();

    // empty the title, content, lantool, reference for
    // creating a new note next time
    this.setState({
      title: "",
      content: "",
      lantool: "",
      reference: "",
    });

    // close the dial menu
    this.closeSpeedDialMenu();
  };

  /**
   * Handler for canceling the creation of the new note
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
   * Enable the Search UI component. (topbar)
   */
  enableSearch = () => {
    this.setState({ isSearchEnabled: !this.state.isSearchEnabled });
  };

  enableFilter = () => {
    // TODO: enable filter bar
    // in a filter bar, one should be able to filter by title, time, lantool
    this.alertWithText("Filter feature is not ready", "info");
  }

  /**
   * Handler for redirecting the user to the profile management page
   */
  toProfilePage = () => {
    this.setState({ toProfilePage: true });
  };

  /**
   * Helper function for opening and closing the speed dial menu
   */
  openSpeedDialMenu = () => {
    this.setState({ toggleMenu: true });
  };
  closeSpeedDialMenu = () => {
    this.setState({ toggleMenu: false });
  };

  /**
   * Helper function to show the user a custom alert with the desired message
   *
   * @param  message  the message to show the user
   * @param  type     alert severity: error, warning, info, success
   */
  alertWithText = (message, type) => {
    this.setState({
      alert: true,
      alertMessage: message,
      alertType: type,
    });
  };

  /**
   * Helper function to close the custom alert
   */
  dismissAlert = () => {
    this.setState({ alert: false });
  };

  render() {

    // redirection to the profile page
    if (this.state.toProfilePage) {
      return <Redirect from="/home" push to="/home/profile" />;
    }

    return (
      <div>
        {/* Search bar in the top */}
        <Fade in={this.state.isSearchEnabled}>
          <div>
          <AppBar 
            position="fixed"
            color="secondary"
            variant="elevation"
            elevation={0}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Toolbar>
                <Topbar enabled={this.state.isSearchEnabled}/>
              </Toolbar>
              <IconButton
                // disable search topbar on click
                onClick={() => {
                  this.setState({
                    isSearchEnabled: false
                  })
                }}
              >
                <ClearIcon/>
              </IconButton>
            </Grid>
          </AppBar>
          <Toolbar/>
          </div>
        </Fade>

        {/* Speed dial menu on the right */}
        <AppBar
          position="fixed"
          color="transparent"
          variant="elevation"
          elevation={0}
          style={{
            width: "60px",
            right: "10px",
            top: "50%",
            bottom: "50px"
          }}
        >
          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Grid item>
              <SpeedDial
                ariaLabel="Application menu"
                FabProps={{ 
                  color: "secondary", 
                  size: "large" 
                }}
                icon={
                  <SpeedDialIcon
                    icon={<AppsIcon style={{ color: "#fff" }} />}
                    openIcon={<KeyboardArrowUpIcon style={{ color: "#fff" }} />}
                  />
                }
                direction="up"
                onClick={() => {
                  this.state.toggleMenu ? this.closeSpeedDialMenu() : this.openSpeedDialMenu();
                }}
                open={this.state.toggleMenu}
              >
                {this.state.actions.map((action) => {
                  // Using span to change the background color of the icon
                  // since mui's SpeedDialogAction does not have a color prop
                  let icon = (
                    <span
                      style={{
                        borderRadius: 100,
                        backgroundColor: "#fff",
                        padding: 8,
                        paddingBottom: 3
                      }}
                    >
                      {action.icon}
                    </span>
                  );

                  return (
                    <SpeedDialAction
                      key={action.name}
                      icon={icon}
                      tooltipTitle={action.name}
                      onClick={action.onClick}
                    />
                  );
                })}
              </SpeedDial>
            </Grid>
          </Grid>
        </AppBar>

        {/* Container to show the notes */}
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          {this.state.notes}
        </Grid>

        {/* Adding new note */}
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

        <Snackbar
          open={this.state.alert}
          autoHideDuration={3000}
          onClose={this.dismissAlert}
          onClick={this.dismissAlert}
        >
          <Alert
            severity={this.state.alertType}
            onClose={this.dismissAlert}
            variant="filled"
          >
            {this.state.alertMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
