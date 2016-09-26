import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);

    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handlePassChange(e) {
    this.setState({ password: e.target.value })
  }

  register(e) {
    e.preventDefault();
    console.log('form inputs?')
    console.log('e: ', this.state);
  }

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.register}
          >
          <label>
            Email:
            <input
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleEmailChange} />
          </label>
          <label>
            Username:
            <input
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleUsernameChange} />
          </label>
          <label>
            Password:
            <input
              type="text"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePassChange} />
          </label>

          <button type="submit">Sign Up!</button>
        </form>
      </div>
    )
  }
}
