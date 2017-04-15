import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditorState } from 'draft-js';
import uuid from 'node-uuid';

import { createThought } from '../actions/thoughts';
import { logoutUser } from '../actions/users';

class UserNav extends Component {
  createNewThought = () => {
    const { dispatch } = this.props;
    const id = uuid.v4();
    const contentState = EditorState.createEmpty().getCurrentContent();
    dispatch(createThought(id, contentState));
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }


  render() {
    const { user } = this.props;

    return (
      <div className="user-center">
      {
        user ?
        <span>
          <span>{user.username} </span>
          <button onClick={this.createNewThought}>PLUS</button>
          <button onClick={this.logout}>Logout</button>
        </span> :
        <span>
          <button className="button"><Link to="/login">Login</Link></button>
          <button className="button"><Link to="/register">Sign Up</Link></button>
        </span>
      }
      </div>
    )
  }
}

export default connect()(UserNav);
