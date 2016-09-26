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

    fetch(apiURL + '/users/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userInfo.email,
        username: userInfo.username,
        password: userInfo.password
      }).then((response) => dispatch({ type: types.REGISTRATION_SUCCESSFUL }))
        .catch((err) => dispatch({ type: types.REGISTRATION_FAILED }))
    })
  }
}
