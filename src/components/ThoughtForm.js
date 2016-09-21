import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import uuid from 'node-uuid';

import { finishedEditing, setScore } from '../actions/thoughts';

export default class ThoughtForm extends Component {
  constructor(props) {
    super(props)
    const { thought } = props;

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.focus = this.focus.bind(this);
    this.onEscape = this.onEscape.bind(this);

    this.state = {
      id: thought ? thought.get('id') : uuid.v4(),
      editorState: thought ? EditorState.createWithContent(thought.get('contentObj')) : EditorState.createEmpty()
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    }
  }

  focus() {
    this.refs.editor.focus();
    this.setState({
      editing: true
    })
    // chnage style to full height/full screen
  }

  onEscape() {
    this.refs.editor.blur();
    this.setState({
      editing: false
    })
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  doneEditing() {
    const { dispatch } = this.props;
    const { id, editorState } = this.state;
    this.setState({
      editing: false
    });
    dispatch(finishedEditing(id, editorState.getCurrentContent()));
    dispatch(setScore(id, editorState.getCurrentContent()));
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
          onEscape={this.onEscape}
          onTab={this.onTab}
          placeholder="Start Writing..."
          ref="editor"
          />
          {
            this.state.editing ?
              <button onClick={this.doneEditing}>SAVE</button> :
              <button>EDIT</button>
          }
      </div>
    )
  }

}
