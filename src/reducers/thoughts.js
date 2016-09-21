import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

import sentiment from 'sentiment';

const initialState = List();

export default function(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_THOUGHT:
      return _createThought(state, action);
    case types.FINISHED_EDITING:
      return _finishedEditing(state, action);
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

  console.log('contentState in reducer: ', action.payload.contentState)

  return state.push(
    Map({
      id: action.payload.id,
      contentState: action.payload.contentState
    })
  )
}

function _finishedEditing(state, action) {
  const thoughtIndex = state.findIndex((thoughtIndex) => {
    return thoughtIndex.get('id') === action.payload.id;
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

  return state.updateIn([thoughtIndex, 'content'], content => action.payload.contentState);
}

function _setThoughts(state, action) {
  state = List(action.thoughts);
  return state;
}

function _setScore(state, action) {
  const text = action.payload.contentState.getPlainText();
  const score = sentiment(text);

  fetch('http://localhost:3000/thoughts/new', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: action.payload.id,
      contentState: action.payload.contentState
    })
  }).then((response) => response.json())
    .then((response) => {

    });

  const thoughtIndex = state.findIndex((thoughtIndex) => {
    return thoughtIndex.get('id') === action.payload.id;
  })

  return state.updateIn([thoughtIndex, 'score'], () => score);
}
