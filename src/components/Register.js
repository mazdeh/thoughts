import React, { Component } from 'react';
import { registerUser } from '../actions/users';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);

    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  handleFieldChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  register(e) {
    // redirect to post-signup page?!
    e.preventDefault();
    const { dispatch } = this.props;
    const userInfo = this.state;
    console.log('userInfo: ', userInfo);
    dispatch(registerUser(userInfo));
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
              name="email"
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleFieldChange} />
          </label>
          <label>
            Username:
            <input
              name="username"
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleFieldChange} />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="text"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleFieldChange} />
          </label>

          <button type="submit">Sign Up!</button>
        </form>
      </div>
    )
  }
}
