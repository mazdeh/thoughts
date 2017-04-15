import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils } from 'draft-js';
import dateformat from 'dateformat';
import { isEmpty, throttle } from 'underscore';

import { setUserThoughts, saveThought, deleteThought } from '../actions/thoughts';

const editorStyles = {
  'BOLD': {
    fontSize: '3em',
  }
}

class ThoughtForm extends Component {
  constructor(props) {
    super(props)
    this.autoSave = throttle(this.autoSave, 10 * 1000);

    const thoughtId = props.match.params.id;
    this.state = {
      thought: null,
      id: thoughtId,
      editorState: null,
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
      this.autoSave();
    }
  }

  componentDidMount() {
    const { dispatch, user, thoughts } = this.props;
    dispatch(setUserThoughts(user.id));
    if (!thoughts) {
      dispatch(setUserThoughts(user.id));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.thoughts !== nextProps.thoughts) {
      let thought = nextProps.thoughts.find((thought) => {
        return thought.get('id') === this.state.id;
      });
      this.setState({
        thought: thought,
        id: thought ? thought.get('id') : null,
        editorState: thought ? EditorState.createWithContent(thought.get('contentState')) : null,
      })
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
  }

  onEscape() {
    this.refs.editor.blur();
    this.setState({
      editing: false
    })
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  doneEditing = () => {
    const { dispatch } = this.props;
    const { id, editorState } = this.state;
    this.setState({
      editing: false
    });
    dispatch(saveThought(id, editorState.getCurrentContent()));
    // dispatch(setScore(id, editorState.getCurrentContent()));
  }

  deleteItem = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(deleteThought(id));
  }

  render() {

    const { thought } = this.state;
    return (
      thought ? (<div
        className="row"
        onClick={this.expand}
        >
        <small className="date">
          Verbalized on: {
            dateformat(thought.dateCreated, "dddd, mmmm dS, yyyy")
          }
        </small>
        <Editor
          className="editor"
          customStyleMap={editorStyles}
          textAlignment='center'
          editorState={this.state.editorState}
          spellCheck={true}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          onEscape={this.onEscape}
          onTab={this.onTab}
          placeholder="Start Writing..."
          ref="editor"
          />
          <div>
            <button onClick={this.doneEditing}>Save</button>
            <button onClick={this.deleteItem}>Delete</button>
          </div>
      </div>) : null
    )
  }

}


function mapStateToProps(state) {
  const { user, thoughts } = state;
  return {
    user,
    thoughts,
  };
}

export default connect(mapStateToProps)(ThoughtForm);
