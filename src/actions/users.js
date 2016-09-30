import * as types from '../constants/ActionTypes';
import { apiUrl } from '../constants/serverAPI';

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
      .then((response) => dispatch({
      type: types.LOGIN_SUCCESSFUL,
      payload: {
        user: response
      }
    }))
      .catch((err) => dispatch({ type: types.LOGIN_FAILED }))
  }
}
