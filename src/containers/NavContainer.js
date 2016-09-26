import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {
  render() {
    return(
      <div className="nav-container">
        <span className="nav-logo">T</span>

        <div className="user-center">
          <button className="button"><Link to="/register">Sign Up</Link></button>
          <button className="button"><Link to="/login">Login</Link></button>
        </div>
      </div>
    )
  }

}
