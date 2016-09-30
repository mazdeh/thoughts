import React, { Component } from 'react';

import Thought from './Thought';
import ThoughtForm from './ThoughtForm';

export default class ThoughtList extends Component {
  render() {
    const { thoughts, dispatch } = this.props;
    // componenet Key's -- i.e. <ThoughtForm key={} />
    // should be a unique identifier of the component and
    // not a mapping of the index in the array.
    // if the component has a uuid, always assign key the uuid
    return (
      <div>
        {
          thoughts ?
            thoughts.map((thought) => {
              return <ThoughtForm key={thought.get('id')} thought={thought} {...this.props} />
            }) :
            null
        }
      </div>
    )

  }
}
