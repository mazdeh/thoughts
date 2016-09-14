import React, { Component } from 'react';

import Thought from './Thought';
import ThoughtForm from './ThoughtForm';

export default class ThoughtList extends Component {
  render() {
    const { thoughts, dispatch } = this.props;
    return (
      <div>
        {
          thoughts ?
            thoughts.map((thought, key) => {
              return <Thought key={key} thought={thought} {...this.props} />
            }) :
            null
        }
      </div>
    )

  }
}
