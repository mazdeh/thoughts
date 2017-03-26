import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavContainer from './NavContainer';
import ThoughtsContainer from '../containers/ThoughtsContainer';
import '../styles/main.scss';

import {currentUser} from '../actions/users';

class App extends Component {
  componentWillMount() {
    const {dispatch} = this.props;
    // is componentWillMount the best place for this action call?
    dispatch(currentUser())
  }

  render() {
    return (
      <span className="container">
        <NavContainer />
        {this.props.children}
      </span>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(App);
