import { Map, Record } from 'immutable';

export function makeMap(thoughts) {
  let mappedThoughts = [];
  thoughts.forEach((thought) => {
    let contentObj = JSON.parse(thought.contentObj);
    console.log('contentObj: ', contentObj);
    thought.contentObj = Record(contentObj);
    console.log('thought.contentObj: ', thought.contentObj);
    thought = Map(thought);
    console.log('final thought: ', thought);
    mappedThoughts.push(thought)
  })
  return mappedThoughts;
}
