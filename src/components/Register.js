import React, { Component } from 'react';

export default class Register extends Component {
  register(e) {
    e.preventDefault();
    console.log('form inputs?')
    console.log('e: ', e);
  }

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.register}
          >
          <label>
            Email:
            <input type="text" placeholder="email" />
          </label>
          <label>
            Username:
            <input type="text" placeholder="username" />
          </label>
          <label>
            Password:
            <input type="text" placeholder="password" />
          </label>

          <button type="submit">Sign Up!</button>
        </form>
      </div>
    )
  }
}
