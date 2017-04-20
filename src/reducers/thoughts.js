import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

const initialState = [];

function createThought(state, action) {
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

function saveThought(state, action) {
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

function deleteThought(state, action) {
  const thoughtIndex = state.findIndex((thought) => {
    return thought.get('id') === action.payload.id;
  })
  if (thoughtIndex === -1) {
    console.log('No Item found with ID: ', action.payload.id);
    return state;
  }

  return state.delete(thoughtIndex);
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_THOUGHT:
      return createThought(state, action);
    case types.SAVE_THOUGHT_REQUEST:
      return saveThought(state, action);
    case types.DELETE_THOUGHT_REQUEST:
      return deleteThought(state, action);
    case types.SET_USER_THOUGHTS:
      return action.payload.thoughts;
    case types.CLEAR_THOUGHTS:
      return [];
    default:
      return state;
  }
}
