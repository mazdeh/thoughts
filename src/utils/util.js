import { Map } from 'immutable';
import { convertFromRaw } from 'draft-js';

export function convertToContentState(thoughts) {
  let thoughtsForRedux = [];
  thoughts.forEach((thought) => {
    if (!thought.rawContent.entityMap) {
      thought.rawContent['entityMap'] = {};
    }
    const contentState = convertFromRaw(thought.rawContent);
    const thoughtMap = Map(thought);
    const thoughtForRedux = thoughtMap.merge({
      contentState: contentState
    });
    thoughtsForRedux.push(thoughtForRedux);
  })
  return thoughtsForRedux;
}
