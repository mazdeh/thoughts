import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

import sentiment from 'sentiment';

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

    case types.SET_SCORE:
      return _setScore(state, action);
    case types.SET_THOUGHTS:
      return _setThoughts(state, action);
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
      contentState: action.payload.contentState
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
        contentState: action.payload.contentState
      })
    )
  }

  return state.updateIn([thoughtIndex, 'contentState'], contentState => action.payload.contentState);
}

function _setThoughts(state, action) {
  state = List(action.thoughts);
  return state;
}

function _deleteThought(state, action) {
  console.log('id: ', action.payload.id);
  const thoughtIndex = state.findIndex((thought) => {
    return thought.get('id') === action.payload.id;
  })
  if (thoughtIndex === -1) {
    console.log('No Item found with ID: ', action.payload.id);
    return state;
  }

  return state.delete(thoughtIndex);
}

function _setScore(state, action) {
  const score = sentiment('vahid');

  const thoughtIndex = state.findIndex((thought) => {
    return thought.get('id') === action.payload.id;
  })

  return state.updateIn([thoughtIndex, 'score'], () => score);
}
