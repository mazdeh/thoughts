import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import ThoughtForm from './ThoughtForm';

export default class Thought extends Component {
  constructor(props) {
    super(props);
    const { thought } = this.props;
    this.state = {
      id: thought.get('id'),
      editorState: thought.get('contentObj')
    };
  }

  componentWillReceiveProps(nextProps) {
    const { thought } = nextProps;
    this.setState({
      editorState: thought.get('contentObj')
    })
  }

  componentWillUpdate(nextProps) {
    console.log('nextProps: ', nextProps.thought.toJS());
  }

  render() {
    const { thought, dispatch } = this.props;
    const content = thought.get('contentObj');
    const hasText = content.hasText();

    return (
      <span className="row">
      {
        hasText ?
          <span>
            <span>{thought.get('score').comparative}</span>
            <ThoughtForm thought={thought} dispatch={dispatch} />
          </span> :
          <ThoughtForm thought={thought} dispatch={dispatch} />
      }
      </span>
    )
  }
}
