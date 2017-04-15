import * as types from '../constants/ActionTypes';

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESSFUL:
      return action.payload.user;
    case types.LOGOUT_REQUEST:
      return null;
    default:
      return state;
  }
}
