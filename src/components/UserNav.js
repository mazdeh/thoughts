import React, { Component } from 'react';
import { Link } from 'react-router';
import { EditorState } from 'draft-js';
import uuid from 'node-uuid';

import { createThought } from '../actions/thoughts';

export default class UserNav extends Component {
  constructor(props) {
    super(props);
    this.createNewThought = this.createNewThought.bind(this);
  }

  createNewThought() {
    const { dispatch } = this.props;
    const id = uuid.v4();
    const contentState = EditorState.createEmpty().getCurrentContent();
    dispatch(createThought(id, contentState));
  }

  logout() {
    console.log('log user out');
  }


  render() {
    const { auth, user } = this.props;
    const authed = auth.get('authed');
    
    return (
      <div className="user-center">
      {
        authed ?
        <span>
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
