import * as types from '../constants/ActionTypes';
import { makeMap } from '../utils/makeMap';

export function createThought(id, contentState) {
  return {
    type: types.CREATE_THOUGHT,
    payload: {
      id,
      contentState
    }
  }
}

export function finishedEditing(id, contentState) {
  return {
    type: types.FINISHED_EDITING,
    payload: {
      id,
      contentState
    }
  }
}

export function setScore(id, contentState) {
  return {
    type: types.SET_SCORE,
    payload: {
      id,
      contentState
    }
  }
}

export function setThoughts() {
  return function(dispatch) {
    fetch('http://localhost:3000/thoughts/all')
      .then((response) => response.json())
      .then((response) => {
        let thoughts = response.Items;
        const thoughtsCount = response.Count;
        const scannedThoughts = response.ScannedCount;
        thoughts = makeMap(thoughts);
        console.log('thoughts: ', thoughts[0].toJS());
        dispatch(_setThoughts(thoughts))
      })
  }
}

function _setThoughts(thoughts) {
  return {
    type: types.SET_THOUGHTS,
    thoughts
  }
}
