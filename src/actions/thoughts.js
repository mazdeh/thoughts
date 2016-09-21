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
    fetch('http://localhost:3000/thoughts/1d195c08-7e00-40b1-abdc-885e3490b5ed')
      .then((response) => response.json())
      .then((response) => {
        const thoughts = response.Responses.thoughts;
        console.log('thoughts: ', JSON.parse(thoughts[0].contentObj));
        dispatch(_setThoughts(thoughts))
      })
  }
}
