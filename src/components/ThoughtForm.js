import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { throttle } from 'underscore';
import uuid from 'node-uuid';

import { finishedEditing, saveThought } from '../actions/thoughts';

export default class ThoughtForm extends Component {
  constructor(props) {
    super(props)
    const { thought } = props;

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    // this.saveContent = throttle(this.saveContent, 10000);

    this.focus = this.focus.bind(this);
    this.onEscape = this.onEscape.bind(this);


    if (thought) {
      console.log('thought in form: ', thought.get('id'));
    }

    this.state = {
      id: thought ? thought.get('id') : uuid.v4(),
      editorState: thought ? thought.get('content') : EditorState.createEmpty()
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
      const thoughtContent = editorState.getCurrentContent().toJS();
      // this.saveContent(thoughtContent);
    }
  }

  focus() {
    this.refs.editor.focus();
    console.log('focus');
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

  // cmd+b/i etc
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  // saveContent(thoughtContent) {
  //   const { dispatch } = this.props;
  //   const { id } = this.state;
  //   dispatch(saveThought(id, thoughtContent));
  // }

  doneEditing() {
    const { dispatch } = this.props;
    const { id, editorState } = this.state;
    dispatch(finishedEditing(id, editorState));
    // this.setState({
    //   id: uuid.v4(),
    //   editorState: EditorState.createEmpty()
    // })
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
              <button onClick={this.doneEditing}>DONE</button> :
              <button>EDIT</button>
          }
      </div>
    )
  }

}
