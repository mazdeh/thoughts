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
    }).then((response) => response.json())
      .then((response) => {
        console.log('response: ', response)
        dispatch({
          type: types.LOGIN_SUCCESSFUL,
          payload: {
            user: response
          }
      });
      dispatch({ type: types.AUTH_TOGGLE, payload: { authed: true }})

      // user object now contains an array of all thought id's
      // get the thoughts from the thought collection when needed
      const userId = response._id;
      dispatch(setThoughts(userId));
      browserHistory.push('/');
    })
      .catch((err) => dispatch({ type: types.LOGIN_FAILED }))
  }
}
