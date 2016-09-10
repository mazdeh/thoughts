import React, { Component } from 'react';
import { connect } from 'react-redux';

// remove this later?
import * as types from '../constants/ActionTypes';

import NavContainer from './NavContainer';
import ThoughtsContainer from '../components/ThoughtsContainer';
import '../styles/main.scss';

class App extends Component {
  componentDidMount() {
    const thoughtsArray = [
      {
        text: 'vahid',
        score: 0
      },
      {
        text: 'saeed',
        score: 2
      }
    ];

    const { dispatch } = this.props;
    const set = {
      type: types.SET_THOUGHTS,
      thoughtsArray
    }
    dispatch(set);
  }

  render() {
    return (
      <span className="container">
        <NavContainer />
        <ThoughtsContainer />
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
