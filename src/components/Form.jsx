import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Label from './Label';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state, e);
  }

  render() {
    return (
      <div>
        <form
          {...this.props}
          onSubmit={this.handleSubmit}
        >
          <Label htmlFor="username">Username:</Label>
          <input
            name="username"
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleFieldChange}
          />
          <Label htmlFor="password">Password:</Label>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleFieldChange}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}


Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
