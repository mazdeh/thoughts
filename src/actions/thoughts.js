import * as types from '../constants/ActionTypes';

export function createThought(id, content) {
  return {
    type: types.CREATE_THOUGHT,
    payload: {
      id,
      content
    }
  }
}

export function finishedEditing(id, content) {
  return {
    type: types.FINISHED_EDITING,
    payload: {
      id,
      content
    }
  }
}

export function setScore(id, content) {
  return {
    type: types.SET_SCORE,
    payload: {
      id,
      content
    }
  }
}

export function setThoughts() {
  return function(dispatch) {
    fetch('http://localhost:3000/thoughts/all')
      .then((response) => response.json())
      .then((response) => {
        const thoughts = response.Items;
        const thoughtsCount = response.Count;
        const scannedThoughts = response.ScannedCount;

        thoughts.forEach((thought) => {
          console.log('thought: ', thought);
        })
        // console.log('thoughts: ', JSON.parse(thoughts[0]));
        // dispatch(_setThoughts(thoughts))
      })
  }
}

function _setThoughts(thoughts) {
  return {
    type: types.SET_THOUGHTS,
    thoughts
  }
}
