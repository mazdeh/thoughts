import React, { Component } from 'react';

import Thought from './Thought';
import ThoughtForm from './ThoughtForm';

export default class ThoughtList extends Component {
  render() {
    const { thoughts, dispatch } = this.props;
    console.log('thoughts in list: ', thoughts.toJS());
    return (
      <div>
        {
          thoughts ?
            thoughts.map((thought, key) => {
              return <ThoughtForm key={key} thought={thought} {...this.props} />
            }) :
            null
        }
      </div>
    )

  }
}
