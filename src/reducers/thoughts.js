import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

const initialState = List();

export default function(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_THOUGHT:
      return _createThought(state, action);


    case types.SAVE_THOUGHT_REQUEST:
      return _saveThought(state, action);
    case types.SAVE_THOUGHT_SUCCESSFUL:
      return state;
    case types.SAVE_THOUGHT_FAILED:
      // roll back state, cause data was not save to db.
      return _stateRollBakc();

    case types.DELETE_THOUGHT_REQUEST:
      return _deleteThought(state, action);
    case types.DELETE_THOUGHT_SUCCESSFUL:
      return state;
    case types.DELETE_THOUGHT_FAILED:
      return _deleteRollBack()

    case types.SET_USER_THOUGHTS:
      return _setThoughts(state, action);
    case types.CLEAR_THOUGHTS:
      return List();
  }
  return state;
}

function _createThought(state, action) {
  // if there's an empty thought, don't create a new one
  const lastThought = state.last();
  if (lastThought) {
    const content = lastThought.get('contentState')
    const hasText = content.hasText();
    if (!hasText) {
      return state;
    }
  }

  return state.push(
    Map({
      id: action.payload.id,
      contentState: action.payload.contentState,
      dateCreated: action.payload.dateCreated,
      lastSaved: action.payload.lastSaved
    })
  )
}

function _saveThought(state, action) {
  const thoughtIndex = state.findIndex((thought) => {
    return thought.get('id') === action.payload.id;
  })

  // if no entry with action.id exists, add a new entry
  if (thoughtIndex === -1) {
    return state.push(
      Map({
        id: action.payload.id,
        contentState: action.payload.contentState,
        lastSaved: action.payload.lastSaved
      })
    )
  }

  const { contentState, lastSaved } = action.payload;

  return state.updateIn([thoughtIndex], thought => thought.merge({
    contentState: contentState,
    lastSaved: lastSaved
  }))
}

function _setThoughts(state, action) {
  state = List(action.payload.thoughts);
  return state;
}

function _deleteThought(state, action) {
  const thoughtIndex = state.findIndex((thought) => {
    return thought.get('id') === action.payload.id;
  })
  if (thoughtIndex === -1) {
    console.log('No Item found with ID: ', action.payload.id);
    return state;
  }

  return state.delete(thoughtIndex);
}
