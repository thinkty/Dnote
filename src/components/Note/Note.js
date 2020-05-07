/**
 * React component for notes
 * It should display the following contents:
 *  - title
 *  - content
 *  - language or tool
 *  - creation time
 *  - reference
 */

import React, { Component } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Card,
  CardHeader,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CardContent,
  Divider,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Icon from "../Icons";
import LinkPreview from "../LinkPreview";

const iconList = require("../Icons/list.json");
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.data.title,
      content: props.data.content,
      lantool: props.data.lantool,
      tempTitle: props.data.title,
      tempContent: props.data.content,
      tempLantool: props.data.lantool,
      tempReference: props.data.reference,
      time: props.data.time,
      formattedTime: "",
      reference: props.data.reference,
      openSubmenu: null,
      isEditNote: false,
      detonate: props.detonate,
    };
  }

  /**
   * Helper function to get the time format from the given time in miliseconds
   */
  getTime = (time) => {
    let date = new Date(time);
    return (
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear()
    );
  };

  /**
   * Helper function to toggle the submenu when clicking on the top right menu icon
   */
  toggleSubmenu = (event) => {
    if (this.state.openSubmenu === null) {
      this.setState({
        openSubmenu: event.currentTarget,
      });
    } else {
      this.setState({
        openSubmenu: null,
      });
    }
  };

  /**
   * Helper function to remove the note
   */
  removeNote = () => {
    // TODO: Make call to the server

    // destroy self
    this.state.detonate(this.state.time);
    this.toggleSubmenu();
  };

  /**
   * Helper function to edit the note
   */
  editNote = () => {
    // open the edit note dialog with prefilled information
    this.setState({
      isEditNote: !this.state.isEditNote,
    });
  };

  /**
   * Handler for changes on new note creation
   */
  onTempNoteChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  /**
   * Special case for handling lantool change
   */
  onLantoolChange = (value) => {
    this.setState({
      tempLantool: value,
    });
  };

  /**
   * Handler for submitting the editted note
   */
  onSubmit = (event) => {
    event.preventDefault();

    // Make sure none of the details are empty
    if (this.state.tempTitle === "") {
      alert("Title cannot be empty");
      return;
    }
    if (this.state.tempContent === "") {
      alert("Content cannot be empty");
      return;
    }
    if (this.state.tempLantool === "") {
      alert("Please choose a language or tool");
      return;
    }

    // update the current title, content, lantool, reference
    this.setState({
      title: this.state.tempTitle,
      content: this.state.tempContent,
      lantool: this.state.tempLantool,
      reference: this.state.tempReference,
    });

    // TODO: Send updated data to the database

    // close the dialog
    this.editNote();
    // close the submenu
    this.toggleSubmenu();
  };

  /**
   * Handler for cancelling the creation of the new note
   */
  onCancel = () => {
    // close the dialog
    this.editNote();
    // close the submenu
    this.toggleSubmenu();
  };

  render() {
    return (
      <Grid
        item
        xs={12}
        style={{ width: "80%", minWidth: "360px", maxWidth: "800px" }}
      >
        <Card>
          <CardHeader
            avatar={<Icon name={this.state.lantool} />}
            action={
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{marginTop: "20%"}}
              >
                <Grid item>
                  <Tooltip
                    title="Note Menu"
                    placement="right"
                    arrow
                    enterDelay={500}
                  >
                    <IconButton onClick={this.toggleSubmenu}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 25 25"
                        width="30px"
                        height="30px"
                      >
                        <line
                          x1="10"
                          y1="10"
                          x2="15"
                          y2="10"
                          stroke="#6698FA"
                          strokeWidth="5"
                        />
                        <line
                          x1="10"
                          y1="20"
                          x2="15"
                          y2="20"
                          stroke="#6698FA"
                          strokeWidth="5"
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={this.state.openSubmenu}
                    keepMounted
                    open={Boolean(this.state.openSubmenu)}
                    onClose={this.toggleSubmenu}
                  >
                    <MenuItem onClick={this.removeNote}>Remove</MenuItem>
                    <MenuItem onClick={this.editNote}>Edit</MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            }
            title={this.state.title}
            subheader={this.getTime(this.state.time)}
            style={{marginBottom: "-3%", marginTop: "-2%"}}
          />
          <Divider/>
          <CardContent>
            <Typography variant="body2">{this.state.content}</Typography>
          </CardContent>
          {this.state.reference === "" ? (
            <div />
          ) : (
            <DialogActions>
              <LinkPreview link={this.state.reference} />
            </DialogActions>
          )}
        </Card>


        <Dialog
          open={this.state.isEditNote}
          onClose={() => {
            this.editNote();
            this.toggleSubmenu();
          }}
        >
          <DialogTitle>
            <Typography>Edit Note</Typography>
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus
              id="tempTitle"
              required
              color="secondary"
              margin="normal"
              label="Title"
              type="text"
              fullWidth
              onChange={this.onTempNoteChange}
              value={this.state.tempTitle}
            />
            <TextField
              id="tempContent"
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
              onChange={this.onTempNoteChange}
              value={this.state.tempContent}
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
              id="tempReference"
              color="secondary"
              margin="normal"
              label="Reference"
              type="text"
              fullWidth
              onChange={this.onTempNoteChange}
              value={this.state.tempReference}
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
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}
