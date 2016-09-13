import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default class Thought extends Component {
  constructor(props) {
    super(props);
    const { thought } = this.props;
    console.log('thought: ', thought.toJS());
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
    return (
      <span className="row">

      <Editor
        className="editor"
        editorState={this.state.editorState}
        spellCheck={true}
        />
      </span>
    )
  }
}
