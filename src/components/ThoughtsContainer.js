import React, { Component } from 'react';
import { connect } from 'react-redux';

import ThoughtList from './ThoughtList';
import ThoughtForm from './ThoughtForm';


class ThoughtsContainer extends Component {
  render() {
    const { thoughts } = this.props;
    console.log('thoughts: ', thoughts);
    return (
      <span>
        <ThoughtForm />
        <ThoughtList thoughts={thoughts} />
      </span>
    )
  }
}

function mapStateToProps(state) {
  const { thoughts } = state.main;
  return {
    thoughts
  }
}

export default connect(mapStateToProps)(ThoughtsContainer);
