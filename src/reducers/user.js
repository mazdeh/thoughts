const initialState = {
  thoughts: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'set_thoughts':
      return Object.assign({}, state, {
        thoughts: action.thoughtsArray
      });
  }
  return state;
}
