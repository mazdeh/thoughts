import React, { Component } from 'react';
import { byCreatedDate } from '../utils/util';

import Thought from './Thought';
import ThoughtForm from './ThoughtForm';

export default class ThoughtList extends Component {
  render() {
    const { thoughts, dispatch } = this.props;
    // componenet Key's -- i.e. <ThoughtForm key={} />
    // should be unique identifiers of the component and
    // not a mapping of the index in the array.
    // if the component has a uuid, always assign key the uuid

    const sortedByDateCreated = thoughts.sort(byCreatedDate);
    return (
      <div>
        {
          sortedByDateCreated ?
            sortedByDateCreated.map((thought) => {
              return <ThoughtForm key={thought.get('id')} thought={thought} {...this.props} />
            }) :
            null
        }
      </div>
    )

  }
}
