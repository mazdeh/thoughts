import * as types from '../constants/ActionTypes';
import { Map } from 'immutable';

const initialState = Map({
  'authed': false
});

export default function(state = initialState, action) {
  switch(action.type) {
    case types.AUTH_TOGGLE:
      return state.update('authed', v => v = action.payload.authed)
  }
  return state;
}
