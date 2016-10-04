import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState } from 'draft-js';
import uuid from 'node-uuid';

import ThoughtList from './ThoughtList';
import ThoughtForm from './ThoughtForm';

import { createThought, saveThought } from '../actions/thoughts';

class ThoughtsContainer extends Component {
  render() {
    const { dispatch, thoughts } = this.props;
    return (
      <span>
        <ThoughtList {...this.props} thoughts={thoughts} />
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
