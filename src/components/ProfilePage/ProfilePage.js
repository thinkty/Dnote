/**
 * This is a react component (page) for managing the user account
 * In this page, the user can :
 *  - view statistics based on the notes such as
 *      - number of notes
 *      - distribution of lantool
 *      - contribution graph (similar to github's activity graph)
 *  - change password
 *  - change email
 *  - remove all notes
 *  - remove the account
 */

import React, { Component } from "react";

// do not use user_id as a state as users can view
// the react component states in inspection mode

export default class ProfilePage extends Component {

  /**
   * Helper function to get user_id from cache
   */

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
      </div>
    );
  }
}
