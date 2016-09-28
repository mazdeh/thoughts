import React, { Component } from 'react';
import { Link } from 'react-router';

export default class UserNav extends Component {
  render() {
    const { authed } = this.props.user;
    console.log('authed: ', authed);
    return (
      <div className="user-center">

        <button className="button"><Link to="/register">Sign Up</Link></button>
        <button className="button"><Link to="/login">Login</Link></button>
      </div>
    )
  }
}
