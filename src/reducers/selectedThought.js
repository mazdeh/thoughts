import { SELECTED_THOUGHT } from '../constants/ActionTypes';

const selectedThought = (state = null, action) => {
  switch (action.type) {
    case SELECTED_THOUGHT:
      return action.thoughtId;
    default:
      return state;
  }
};

export default selectedThought;
