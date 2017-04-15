import * as types from '../constants/ActionTypes';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESSFUL:
      return true;
    case types.LOGOUT_REQUEST:
      return false;
    default:
      return state;
  }
}
