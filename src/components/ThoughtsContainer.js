import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState } from 'draft-js';
import uuid from 'node-uuid';

import ThoughtList from './ThoughtList';
import ThoughtForm from './ThoughtForm';

import { createThought } from '../actions/thoughts';

class ThoughtsContainer extends Component {
  constructor(props) {
    super(props);
    this.createNewThought = this.createNewThought.bind(this);
  }

  createNewThought () {
    const { dispatch } = this.props;
    const id = uuid.v4();
    const content = EditorState.createEmpty();
    dispatch(createThought(id, content));
  }

  render() {
    const { dispatch, thoughts } = this.props;

    return (
      <span>
        <button onClick={this.createNewThought}>PLUS</button>
        {/*<ThoughtForm {...this.props} dispatch={dispatch}/>*/}
        <ThoughtList {...this.props} thoughts={thoughts} />
      </span>
    )
  }
}

function mapStateToProps(state) {
  const { thoughts } = state;
  return {
    thoughts
  }
}

export default connect(mapStateToProps)(ThoughtsContainer);
