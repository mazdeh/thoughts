import * as types from '../constants/ActionTypes';
import { convertToContentState } from '../utils/makeMap';
import { convertToRaw } from 'draft-js';

export function createThought(id, contentState) {
  return {
    type: types.CREATE_THOUGHT,
    payload: {
      id,
      contentState
    }
  }
}

export function saveThought(id, contentState) {
  return function(dispatch) {
    // Optimistic Updates
    // dispatch action to save thought in Redux store
    dispatch({
      type: types.SAVE_THOUGHT_REQUEST,
      payload: {
        id,
        contentState
      }
    })

    // attempting Save to DB
    const rawContent = convertToRaw(contentState);
    fetch('http://localhost:3000/thoughts/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        rawContent: rawContent
      })
    }).then((response) => dispatch({ type: types.SAVE_THOUGHT_SUCCESSFUL }))
      .catch((err) => dispatch({ type: types.SAVE_THOUGHT_FAILED }))
  }
}

export function deleteThought(id) {
  return function(dispatch) {
    dispatch({
      type: types.DELETE_THOUGHT_REQUEST,
      payload: {
        id
      }
    })

    const url = 'http://localhost:3000/thoughts/delete/' + id;
    fetch(url, {
      method: 'POST'
    }).then((response) => dispatch({ type: types.DELETE_THOUGHT_SUCCESSFUL }))
      .catch((err) => dispatch({ type: types.DELETE_THOUGHT_FAILED }))
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
        thoughts = convertToContentState(thoughts);
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
