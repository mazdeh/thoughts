import React, { Component } from 'react';

import Thought from './Thought';

export default class ThoughtList extends Component {
  render() {
    const { thoughts } = this.props;
    return (
      <div>
        {
          thoughts.map((thought, key) => {
            return <Thought key={key} thought={thought} />
          })
        }
      </div>
    )

  }
}
