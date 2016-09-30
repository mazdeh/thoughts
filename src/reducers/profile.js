import * as types from '../constants/ActionTypes';
import { Map } from 'immutable';

const initialState = Map({
  username: null
});

export default function(state = initialState, action) {
  switch(action.type) {
    case types.SET_USER_PROFILE:
      return _setUserProfile(state, action);
  }
  return state;
}

function _setUserProfile(state, action) {
  return state;
}
