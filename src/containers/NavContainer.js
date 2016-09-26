import React, { Component } from 'react';

export default class Nav extends Component {

  login(e) {
    // pass in form data to server
    e.preventDefault();
    console.log('log me in');
  }

  render() {
    return(
      <div className="nav-container">
        <span className="nav-logo">T</span>

        <form
          className="login"
          onSubmit={this.login}
          >
          <label>
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              />
          </label>
          <lable>
            <input type="text" placeholder="Password"/>
          </lable>
          <button type="submit">Login</button>
        </form>

      </div>
    )
  }

}
