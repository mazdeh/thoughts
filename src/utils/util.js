import { Map } from 'immutable';
import { convertFromRaw } from 'draft-js';

export function convertToContentState(thoughts) {
  let thoughtsForRedux = [];
  thoughts.forEach((thought) => {
    if (!thought.rawContent.entityMap) {
      thought.rawContent['entityMap'] = {};
    }
    const contentState = convertFromRaw(thought.rawContent);
    const thoughtForRedux = Map({
      id: thought.id,
      contentState: contentState
    })
    thoughtsForRedux.push(thoughtForRedux);
  })
  return thoughtsForRedux;
}
