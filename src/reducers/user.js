import * as types from '../constants/ActionTypes';
import { Map } from 'immutable';

const initialState = Map({
  user: null
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
  const { user } = action.payload;
  return state.updateIn(['auth, authed'], authed => true);
}
