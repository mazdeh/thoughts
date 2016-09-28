import React, { Component } from 'react';

export default class UserCenter extends Component {
  render() {
    return (
      <div className="user-center">
        <button className="button"><Link to="/register">Sign Up</Link></button>
        <button className="button"><Link to="/login">Login</Link></button>
      </div>
    )
  }
}
