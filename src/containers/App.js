import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavContainer from './NavContainer';

class App extends Component {
  render() {
    return (
      <span>
        <NavContainer />
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
