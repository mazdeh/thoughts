import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import ThoughtForm from './ThoughtForm';

export default class Thought extends Component {
  constructor(props) {
    super(props);
    const { thought } = this.props;
    this.state = {
      id: thought.get('id'),
      editorState: thought.get('content')
    };
  }

  componentWillReceiveProps(nextProps) {
    const { thought } = nextProps;
    this.setState({
      editorState: thought.get('content')
    })
  }

  render() {
    const { thought, dispatch } = this.props;
    const content = thought.get('content');
    const hasText = content.getCurrentContent().hasText();
    return (
      <span className="row">
      {
        hasText ?
          <span>
            <div>{thought.get('id')}</div>
            <ThoughtForm thought={thought} dispatch={dispatch} />
          </span> :
          <ThoughtForm thought={thought} dispatch={dispatch} />
      }
      </span>
    )
  }
}
