import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState } from 'draft-js';
import dateformat from 'dateformat';
import { throttle } from 'underscore';

import { setUserThoughts, saveThought } from '../actions/thoughts';

const editorStyles = {
  BOLD: {
    fontSize: '1.5em',
  },
};

class ThoughtForm extends Component {
  constructor(props) {
    super(props);
    this.autoSave = throttle(this.autoSave, 10 * 1000);
  }

  componentWillMount() {
    // const thoughtId = this.props.match.params.id;
    // const { dispatch, user, thoughts } = this.props;

    // if (!thoughts.length === 0) {
    //   const thought = thoughts.find(item => (
    //     item.get('id') === this.state.id
    //   ));
    //
    //   this.state = {
    //     thought,
    //     id: thoughtId,
    //     editorState: EditorState.createWithContent(thought.get('contentState')),
    //   };
    // } else {
    //   dispatch(setUserThoughts(user.id));
    //   this.state = {
    //     thought: null,
    //     id: thoughtId,
    //     editorState: EditorState.createEmpty(),
    //   };
    // }

    const { thought } = this.props;

    this.state = {
      id: thought ? thought.get('id') : null,
      editorState: thought ? EditorState.createWithContent(thought.get('contentState')) : null,
    };
    this.onChange = (editorState) => {
      this.setState({ editorState });
      this.autoSave();
    };
  }

  // componentDidMount() {
  //   const { dispatch, user, thoughts } = this.props;
  //   if (thoughts.length === 0) {
  //     dispatch(setUserThoughts(user.id));
  //   } else {
  //     const { thoughts } = this.props;
  //     const { id } = this.props.match.params;
  //     const thought = thoughts.find(item => (
  //       item.get('id') === id
  //     ));
  //     this.setState({
  //       thought: thought,
  //     });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.thought !== nextProps.thought) {
      this.setState({
        id: nextProps.thought.get('id'),
        editorState: EditorState.createWithContent(nextProps.thought.get('contentState')),
      });
    }
  }

  autoSave() {
    const { id, editorState } = this.state;
    const { dispatch } = this.props;
    if (editorState.getCurrentContent().hasText()) {
      dispatch(saveThought(id, editorState.getCurrentContent()))
    }
  }
  //
  // focus() {
  //   this.refs.editor.focus();
  //   this.setState({
  //     editing: true
  //   })
  // }
  //
  // onEscape() {
  //   this.refs.editor.blur();
  //   this.setState({
  //     editing: false
  //   })
  // }
  //
  // handleKeyCommand = (command) => {
  //   const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
  //   if (newState) {
  //     this.onChange(newState);
  //     return true;
  //   }
  //   return false;
  // }
  //
  // doneEditing = () => {
  //   const { dispatch } = this.props;
  //   const { id, editorState } = this.state;
  //   this.setState({
  //     editing: false
  //   });
  //   dispatch(saveThought(id, editorState.getCurrentContent()));
  //   // dispatch(setScore(id, editorState.getCurrentContent()));
  // }
  //
  // deleteItem = () => {
  //   const { dispatch } = this.props;
  //   const { id } = this.state;
  //   dispatch(deleteThought(id));
  // }

  render() {
    const { thought } = this.props;

    return (
      thought ? (
        <div className="row">
          <small className="date">
            Verbalized on: {
              dateformat(thought.dateCreated, 'dddd, mmmm dS, yyyy')
            }
          </small>
          <Editor
            className="editor"
            customStyleMap={editorStyles}
            textAlignment="center"
            editorState={this.state.editorState}
            spellCheck
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
    );
  }

}


const mapStateToProps = (state) => {
  const { selectedThought, thoughts } = state;
  const thought = thoughts.find(item => (
    item.get('id') === selectedThought
  ));
  // const thought = thoughts[selectedThought];
  return {
    thought,
  };
};

export default connect(mapStateToProps)(ThoughtForm);
