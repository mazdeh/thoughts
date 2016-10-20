import { browserHistory } from 'react-router';

import * as types from '../constants/ActionTypes';
import { apiUrl } from '../constants/serverAPI';
import { setUserThoughts } from '../actions/thoughts';

export function registerUser(userInfo) {
  return function(dispatch) {
    // TODO: hash pass
    dispatch({
      type: types.REGISTRATION_REQUEST,
      payload: {
        userInfo
      }
    })

    fetch(apiUrl + '/user/new', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    }).then((response) => {
      dispatch({ type: types.REGISTRATION_SUCCESSFUL })
      dispatch(loginUser(userInfo));
    })
      .catch((err) => dispatch({ type: types.REGISTRATION_FAILED }))
  }
}

export function loginUser(userInfo) {
  return function(dispatch) {
    dispatch({
      type: types.LOGIN_REQUEST,
      payload: {
        userInfo
      }
    });

    fetch(apiUrl + '/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    }).then((response) => response.json())
      .then((response) => {

        const userObj = {
          id: response._id,
          username: response.local.username
        }

        dispatch({
          type: types.LOGIN_SUCCESSFUL,
          payload: {
            user: userObj
          }
        })

        dispatch(setUserThoughts(userObj.id));
        browserHistory.push('/');
      })
      .catch((err) => dispatch({ type: types.LOGIN_FAILED }))
  }
}

export function logoutUser() {
  return function(dispatch) {
    dispatch({ type: types.LOGOUT_REQUEST });
    dispatch({ type: types.CLEAR_THOUGHTS });

    fetch(apiUrl + '/user/logout', {
      method: 'POST',
      credentials: 'include'
    }).then((response) => response)
      .then((response) => dispatch({ type: types.LOGOUT_SUCCESSFUL }))
      .catch((err) => dispatch({ type: types.LOGOUT_FAILED }))
  }
}
