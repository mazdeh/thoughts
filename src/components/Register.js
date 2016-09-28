import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions/users';

import Form from './Form';

class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register(state, e) {
    // redirect to post-signup page?!
    e.preventDefault();
    const { dispatch } = this.props;
    const userInfo = state;
    dispatch(registerUser(userInfo));
  }

  render() {
    return (
      <Form onSubmit={this.register} />
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(Register);
