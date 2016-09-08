const initialState = {
  thoughts: [
  ]
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'set_thoughts':
      return Object.assign({}, state, {
        thoughts: [
          'thoughtOne': {
            text: 'Vahid is getting some work done.',
            score: undefined
          },
          'thoughtTwo': {
            text: 'Is this array of objects actually working?',
            score: 0
          }
        ]
      })
  }
  return state;
}
