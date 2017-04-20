import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../actions/users';

import Form from './Form';

class Register extends Component {

  register = (state, e) => {
    // redirect to post-signup page?!
    e.preventDefault();
    const { dispatch } = this.props;
    const userInfo = state;
    dispatch(registerUser(userInfo));
  }

  render() {
    return <Form onSubmit={this.register} />;
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Register);
