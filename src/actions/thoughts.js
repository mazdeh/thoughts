import * as types from '../constants/ActionTypes';

export function createThought(id, content) {
  return {
    type: types.CREATE_THOUGHT,
    payload: {
      id,
      content
    }
  }
}

export function saveThought(id, content) {
  return {
    type: types.SAVE_THOUGHT,
    payload: {
      id,
      content
    }
  }
}

export function finishedEditing(id, content) {
  return {
    type: types.FINISHED_EDITING,
    payload: {
      id,
      content
    }
  }
}