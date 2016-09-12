import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { throttle } from 'underscore';
import uuid from 'node-uuid';

import { saveThought } from '../actions/user';

export default class ThoughtForm extends Component {
  constructor() {
    super()
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.saveContent = throttle(this.saveContent, 10000);

    this.focus = () => this.refs.editor.focus();

    this.state = {
      id: uuid.v4(),
      editorState: EditorState.createEmpty()
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
      const thoughtContent = editorState.getCurrentContent().toJS();
      this.saveContent(thoughtContent);
    }
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

  saveContent(thoughtContent) {
    const { dispatch } = this.props;
    const id = this.state.id;
    console.log('thoughtContent: ', thoughtContent);
    dispatch(saveThought(id, thoughtContent));
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
          placeholder="Start Writing..."
          ref="editor"
          />
      </div>
    )
  }

}
