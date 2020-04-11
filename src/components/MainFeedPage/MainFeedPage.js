/**
 * This is the main page to display all the notes that the user currently has created
 * Upon mounting, the client should make a request to the server for the current user's notes
 *
 */

import React, { Component } from "react";
import Topbar from "../Topbar";
import { AppBar, Grid } from "@material-ui/core";
import Note from "../Note";

export default class MainFeedPage extends Component {
  constructor(props) {
    super(props);

    // notes    = array of note components
    // notesMap = array of keys for notes for accessing the note easibly
    this.state = {
      notes: [],
      notesMap: [],
    };
  }

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
   * Make a request to the server for notes of the current user
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
   * This is a helper function that will be passed on to Topbar
   * Topbar will call this function to add the notes visually
   * and also to the server
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
    notes.push(
      <Note
        key={noteData.time.toString()}
        data={noteData}
        detonate={this.detonate}
      />
    );
    // add the key also to the map
    let map = this.state.notesMap;
    map.push(noteData.time.toString()); // TODO: replace to id

    // setState to rerender
    this.setState({
      notes: notes,
      notesMap: map,
    });
  };

  render() {
    return (
      <div>
        <AppBar color="transparent">
          <Topbar createNewNote={this.createNewNote} />
        </AppBar>
        <Grid
          container
          direction="column-reverse"
          justify="center"
          alignItems="center"
          spacing={1}
          style={{marginTop: "5em"}}
        >
          {this.state.notes}
        </Grid>
      </div>
    );
  }
}
