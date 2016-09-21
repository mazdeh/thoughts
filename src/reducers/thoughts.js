import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

import sentiment from 'sentiment';
import AlchemyAPI from 'alchemy-api';

const initialState = List();

export default function(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_THOUGHT:
      return _createThought(state, action);
    case types.FINISHED_EDITING:
      return _finishedEditing(state, action);
    case types.SET_SCORE:
      return _setScore(state, action);
    case types.GET_THOUGHTS:
      return _getThoughts(state, action);
  }
  return state;
}

function _createThought(state, action) {
  // if there's an empty thought, don't create a new one
  const lastThought = state.last();
  if (lastThought) {
    const content = lastThought.get('content')
    const hasText = content.getCurrentContent().hasText();
    if (!hasText) {
      return state;
    }
  }

  return state.push(
    Map({
      id: action.payload.id,
      content: action.payload.content,
      score: null
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
        content: action.payload.content,
        score: null
      })
    )
  }

  return state.updateIn([thoughtIndex, 'content'], content => action.payload.content);
}

function _getThoughts(state, action) {
  return state;
}

function _setScore(state, action) {
  const text = action.payload.content.getCurrentContent().getPlainText();
  const score = sentiment(text);

  fetch('http://localhost:3000/thoughts/new', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: action.payload.id,
      contentObj: action.payload.content,
      contentText: text
    })
  }).then((response) => response.json())
    .then((response) => {

    });


  fetch('http://localhost:3000/thoughts/1d195c08-7e00-40b1-abdc-885e3490b5ed')
    .then((response) => response.json())
    .then((response) => {
      const thoughts = response.Responses.thoughts;
      console.log('thoughts: ', JSON.parse(thoughts[0].contentObj));
    })

  const thoughtIndex = state.findIndex((thoughtIndex) => {
    return thoughtIndex.get('id') === action.payload.id;
  })

  return state.updateIn([thoughtIndex, 'score'], () => score);
}
