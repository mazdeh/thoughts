import * as types from '../constants/ActionTypes';
import { convertToContentState } from '../utils/util';
import { convertToRaw } from 'draft-js';

export function createThought(id, contentState) {
  return {
    type: types.CREATE_THOUGHT,
    payload: {
      id: id,
      contentState: contentState,
      dateCreated: Date(),
      lastSaved: Date()
    }
  }
}

export function saveThought(id, contentState) {
  return function(dispatch) {
    dispatch({
      type: types.SAVE_THOUGHT_REQUEST,
      payload: {
        id: id,
        contentState: contentState,
        lastSaved: Date()
      }
    })

    const rawContent = convertToRaw(contentState);
    const url = 'http://localhost:3000/thoughts/update/' + id;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
      method: 'DELETE'
    }).then((response) => dispatch({ type: types.DELETE_THOUGHT_SUCCESSFUL }))
      .catch((err) => dispatch({ type: types.DELETE_THOUGHT_FAILED }))
  }
}

export function setThoughts(id) {
  return function(dispatch) {
    const url = 'http://localhost:3000/user/' + id +'/thoughts';
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const thoughts = convertToContentState(response);
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
