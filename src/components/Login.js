import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../actions/users';
import Form from './Form';
import { currentUser } from '../actions/users';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
    };
  }

  componentWillMount() {
    const { dispatch, auth } = this.props;
    if (!auth) {
      dispatch(currentUser());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth !== nextProps.auth) {
      this.setState({
        redirectToReferrer: true,
      });
    }
  }

  login = (state, e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const userInfo = state;
    dispatch(loginUser(userInfo));
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        Please log in below:
        <Form onSubmit={this.login} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth,
  }
}

export default connect(mapStateToProps)(Login);
