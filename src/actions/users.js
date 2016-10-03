import { browserHistory } from 'react-router';

import * as types from '../constants/ActionTypes';
import { apiUrl } from '../constants/serverAPI';
import { setThoughts } from '../actions/thoughts';

export function registerUser(userInfo) {
  return function(dispatch) {
    // TODO: hash pass
    dispatch({
      type: types.REGISTRATION_REQUEST,
      payload: {
        userInfo
      }
    })

    fetch(apiUrl + '/users/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    }).then((response) => dispatch({ type: types.REGISTRATION_SUCCESSFUL }))
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

    fetch(apiUrl + '/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    }).then((response) => response)
      .then((response) => {
        dispatch({
          type: types.LOGIN_SUCCESSFUL,
          payload: {
            user: response
          }
      });
      dispatch({ type: types.AUTH_TOGGLE, payload: { authed: true }})
      dispatch(setThoughts());
      browserHistory.push('/');
    })
      .catch((err) => dispatch({ type: types.LOGIN_FAILED }))
  }
}
