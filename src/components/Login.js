import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../actions/users';
import Form from './Form';

class Login extends Component {
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

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(Login);
