import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavContainer from './NavContainer';
import Form from '../components/Form';
import '../styles/main.scss';

class App extends Component {
  render() {
    return (
      <span className="container">
        <NavContainer />
        <Form />
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
