import * as types from '../constants/ActionTypes';

export function saveThought(thoughtContent) {
  return {
    type: types.SAVE_THOUGHT,
    thoughtContent
  }
}
