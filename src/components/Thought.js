import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default class Thought extends Component {
  constructor(props) {
    super(props);
    const { thought } = this.props;
    console.log('thought: ', thought);
    this.state = {
      editorState: EditorState.createEmpty()
    };
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
