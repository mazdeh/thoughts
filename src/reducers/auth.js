import * as types from '../constants/ActionTypes';
import { Map } from 'immutable';

const initialState = false;

export default function(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESSFUL:
      return true;
  }
  return state;
}
