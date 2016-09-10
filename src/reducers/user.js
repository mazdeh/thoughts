import * as types from '../constants/ActionTypes';
// import { Map, List } from 'immutable';

export default function(state = {}, action) {
  switch(action.type) {
    case types.SAVE_THOUGHT:
      return _saveThought(state, action);
    case types.SET_THOUGHTS:
      return Object.assign({}, state, {
        thoughts: action.thoughtsArray
      })
  }
  return state;
}

function _saveThought(state, action) {
  return state.set('')
}
