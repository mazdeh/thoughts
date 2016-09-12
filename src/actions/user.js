import * as types from '../constants/ActionTypes';

export function saveThought(id, content) {
  return {
    type: types.SAVE_THOUGHT,
    payload: {
      id,
      content
    }
  }
}
