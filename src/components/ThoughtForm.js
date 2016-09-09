import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import sentiment from 'sentiment';


export default class ThoughtForm extends Component {
  constructor() {
    super()
    this.state = {editorState: EditorState.createEmpty()};
    this.focus = () => this.refs.editor.focus();
    this.onTab = (e) => this._onTab(e);
    this.onChange = (editorState) => {
      this.setState({editorState});
      const plainText = editorState.getCurrentContent().getPlainText();
      const textScore = sentiment(plainText);
    }
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  // cmd+b/i etc
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    e.preventDefault();
    console.log('ansts');
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  render() {
    return (
      <div className="row" onClick={this.focus}>
        <Editor
          className="editor"
          editorState={this.state.editorState}
          spellCheck={true}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          onTab={this.onTab}
          placeholder="Enter some text..."
          ref="editor"
          />
      </div>
    )
  }

}
