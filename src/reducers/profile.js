import * as types from '../constants/ActionTypes';
import { Map, Set } from 'immutable';

const initialState = Map({
  id: null,
  username: null,
  thoughtIds: Set()
});

export default function(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESSFUL:
      return _setUserProfile(state, action);
  }
  return state;
}

function _setUserProfile(state, action) {
  return action.payload.user
}
