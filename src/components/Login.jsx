import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginUser, currentUser } from '../actions/users';
import Form from './Form';

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
        redirectToReferrer: nextProps.auth,
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

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.bool,
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

Login.defaultProps = {
  auth: false,
  location: null,
};

export default connect(mapStateToProps)(Login);
