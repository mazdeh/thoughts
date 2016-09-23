import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavContainer from './NavContainer';
import ThoughtsContainer from '../components/ThoughtsContainer';
import { setThoughts } from '../actions/thoughts';
import '../styles/main.scss';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setThoughts());
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
