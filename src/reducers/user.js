import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

const initialState = List([
    // {
    //   id: 1,
    //   text: 'vahid'
    // },
    // {
    //   id: 2,
    //   text: 'saeed'
    // }
]);

export default function(state = initialState, action) {
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
  console.log('action: ', action);
  return state.update(state.findIndex((entry) => {
    return entry.get('id') === action.id;
  }), (entry) => {
    if (!entry) {
      return state.push({
        id: action.payload.id,
        content: action.payload.content
      })
    }
    console.log('entry: ', entry.toJS());
    return entry.set('content: ', action.payload.content)
  }
);
}
