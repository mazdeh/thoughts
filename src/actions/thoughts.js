import { browserHistory } from 'react-router';

import * as types from '../constants/ActionTypes';
import { convertToContentState } from '../utils/util';
import { convertToRaw } from 'draft-js';
import { apiUrl } from '../constants/serverAPI';

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
    const url = apiUrl + '/user/thoughts/' + id;
    fetch(url, {
      method: 'POST',
      credentials: 'include',
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
    browserHistory.push('/me');
    const url = apiUrl + '/user/thoughts/' + id;
    fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    }).then((response) => dispatch({ type: types.DELETE_THOUGHT_SUCCESSFUL }))
      .catch((err) => dispatch({ type: types.DELETE_THOUGHT_FAILED }))
  }
}

export function setUserThoughts(userId) {
  return function(dispatch) {
    const url = apiUrl + '/user/' + userId + '/thoughts';
    fetch(url, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((response) => {
        const thoughts = convertToContentState(response);
        dispatch({
          type: types.SET_USER_THOUGHTS,
          payload: {
            thoughts
          }
        })
      })
      .catch((err) => {
        console.log("Could not get user's Thoughts from the server!");
        console.log('err: ', err);
      })
  }
}
