import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
// import uuid from 'node-uuid';
import { throttle } from 'underscore';

import { saveThought, deleteThought } from '../actions/thoughts';

export default class ThoughtForm extends Component {
  constructor(props) {
    super(props)
    const { dispatch, thought } = props;

    this.doneEditing = this.doneEditing.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.autoSave = throttle(this.autoSave, 10 * 1000);

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = this.focus.bind(this);
    this.onEscape = this.onEscape.bind(this);

    this.state = {
      id: thought.get('id'),
      editorState: EditorState.createWithContent(thought.get('contentState'))
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
      this.autoSave();
    }
  }

  autoSave() {
    const { id, editorState } = this.state;
    const { dispatch } = this.props;
    if (editorState.getCurrentContent().hasText()) {
      dispatch(saveThought(id, editorState.getCurrentContent()))
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
    dispatch(saveThought(id, editorState.getCurrentContent()));
    // dispatch(setScore(id, editorState.getCurrentContent()));
  }

  deleteItem() {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(deleteThought(id));
  }

  render() {
    const thought = this.props.thought.toJS();
    return (
      <div className="row">
        <small className="date">
          Date created: {thought.dateCreated} <br></br>
          Last Saved: {thought.lastSaved}
        </small>
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
          <button onClick={this.doneEditing}>SAVE</button>
          <button onClick={this.deleteItem}>DELETE</button>
      </div>
    )
  }

}
