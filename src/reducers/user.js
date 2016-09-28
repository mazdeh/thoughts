import * as types from '../constants/ActionTypes';
import { Map } from 'immutable';

const initialState = Map({
  authed: false,
  username: null
});

export default function(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN_REQUEST:
      return state;
    case types.LOGIN_SUCCESSFUL:
      return _loginUser(state, action);
  }
  return state;
}

function _loginUser(state, action) {
  console.log('trying to log the user in, on the clinet.');
  return state.merge({
    'authed': true,
    'username': 'vahid'
  });
}
