import React, { Component } from 'react';
import { loginUser } from '../actions/users';
import Form from './Form';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(state, e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const userInfo = state;
    dispatch(loginUser(userInfo));
  }

  render() {
    return(
      <Form onSubmit={this.login} />
    )
  }
}
