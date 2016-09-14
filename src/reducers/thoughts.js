import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

const initialState = List();

export default function(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_THOUGHT:
      return _createThought(state, action);
    case types.SAVE_THOUGHT:
      return _saveThought(state, action);
    case types.FINISHED_EDITING:
      return _finishedEditing(state, action);
  }
  return state;
}

// function _saveThought(state, action) {
//   // fetch('http://localhost:3000/save')
//     // .then((response) => response.toJSON())
//     // .then((response) => console.log('retruned'))
//
//   const thoughtIndex = state.findIndex((thoughtIndex) => {
//     return thoughtIndex.get('id') === action.payload.id;
//   })
//
//   // if no entry with action.id exists, add a new entry
//   if (thoughtIndex === -1) {
//     return state.push(
//       Map({
//         id: action.payload.id,
//         content: action.payload.content
//       })
//     )
//   }
//
//   return state.updateIn([thoughtIndex, 'content'], content => action.payload.content);
// }

function _createThought(state, action) {
  return state.push(
    Map({
      id: action.payload.id,
      content: action.payload.content
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
        content: action.payload.content
      })
    )
  }

  return state.updateIn([thoughtIndex, 'content'], content => action.payload.content);
}
