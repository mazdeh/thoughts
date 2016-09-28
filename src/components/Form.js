import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }

  handleFieldChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  _handleSubmit(e) {
    e.preventDefault();
    if(this.props.onSubmit) {
      this.props.onSubmit(this.state, e);
    } else {
      console.log('no onSubmit func provided by parent.');
    }
  }

  render() {
    return (
      <div className="container">
        <form
          {...this.props}
          onSubmit={this._handleSubmit}
          >
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
