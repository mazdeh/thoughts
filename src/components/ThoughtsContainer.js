import React, { Component } from 'react';
import { connect } from 'react-redux';

import ThoughtList from './ThoughtList';
import ThoughtForm from './ThoughtForm';


class ThoughtsContainer extends Component {
  render() {
    const { dispatch, thoughts } = this.props;
    return (
      <span>
        <ThoughtForm {...this.props} dispatch={dispatch}/>
        <ThoughtList thoughts={thoughts} />
      </span>
    )
  }
}

function mapStateToProps(state) {
  const { thoughts } = state.user;
  return {
    thoughts
  }
}

export default connect(mapStateToProps)(ThoughtsContainer);
