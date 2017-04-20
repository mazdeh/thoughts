import { Map } from 'immutable';
import { convertFromRaw } from 'draft-js';

export function convertToContentState(thoughts) {
  const thoughtsForRedux = [];
  thoughts.forEach((thought) => {
    if (!thought.rawContent.entityMap) {
      thought.rawContent['entityMap'] = {};
    }
    const contentState = convertFromRaw(thought.rawContent);
    const thoughtMap = Map(thought);
    const thoughtForRedux = thoughtMap.merge({ contentState });
    thoughtsForRedux.push(thoughtForRedux);
  });
  return thoughtsForRedux;
}

export function byCreatedDate(a, b) {
  if (a.get('dateCreated') > b.get('dateCreated')) {
    return -1;
  }
  if (a.get('dateCreated') < b.get('dateCreated')) {
    return 1;
  }
  return 0;
}
