import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavContainer from './NavContainer';
import ThoughtsContainer from '../containers/ThoughtsContainer';
import '../styles/main.scss';

class App extends Component {
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
