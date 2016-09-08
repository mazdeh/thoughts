import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavContainer from './NavContainer';
import ThoughtsContainer from '../components/ThoughtsContainer';
import '../styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatch } = this.props;
    const set = { type: 'set_thoughts' }
    dispatch(set);
  }

  render() {
    return (
      <span className="container">
        <NavContainer />
        <ThoughtsContainer />
        <button onClick={this.handleClick}>dispatch</button>
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
