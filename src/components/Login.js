import React, { Component } from 'react';

export default class Login extends Component {
  login(e) {
    // pass in form data to server
    e.preventDefault();
    console.log('log me in');
  }

  render() {
    return(
      <form
        onSubmit={this.login}
        >
        <label>
          <input
            type="text"
            placeholder="Username"
            />
        </label>
        <lable>
          <input type="text" placeholder="Password"/>
        </lable>
        <button type="submit">Login</button>
      </form>
    )
  }
}
