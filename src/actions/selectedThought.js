import { SELECTED_THOUGHT } from '../constants/ActionTypes';

const setSelectedThought = thoughtId => (
  {
    type: SELECTED_THOUGHT,
    thoughtId,
  }
);

export default setSelectedThought;
