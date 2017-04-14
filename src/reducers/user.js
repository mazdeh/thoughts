import * as types from '../constants/ActionTypes';
import { Map, Set } from 'immutable';

const initialState = null;

export default function(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESSFUL:
      return setUserProfile(state, action);
    case types.LOGOUT_REQUEST:
      return logoutUser(state, action);
  }
  return state;
}

function setUserProfile(state, action) {
  return action.payload.user
}

function logoutUser(state, action) {
  return null;
}
