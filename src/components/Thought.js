import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import ThoughtForm from './ThoughtForm';

export default class Thought extends Component {
  constructor(props) {
    super(props);
    const { thought } = this.props;
    this.state = {
      id: thought.get('id'),
      editorState: EditorState.createWithContent(thought.get('contentState'))
    };
  }

  componentWillReceiveProps(nextProps) {
    const { thought } = nextProps;
    this.setState({
      editorState: EditorState.createWithContent(thought.get('contentState'))
    })
  }

  componentWillUpdate(nextProps) {
    // console.log('nextProps: ', nextProps.thought.toJS());
  }

  render() {
    const { thought, dispatch } = this.props;

    console.log('thought in Thought: ', thought.toJS());
    return (
      <span>
        <ThoughtForm thought={thought} dispatch={dispatch} />
      </span>
    )
  }
}
