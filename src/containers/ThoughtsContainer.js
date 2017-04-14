import React, { Component } from 'react';
import { connect } from 'react-redux';
import { byCreatedDate } from '../utils/util';

import ThoughtCard from '../components/ThoughtCard';
import { setUserThoughts } from '../actions/thoughts';

class ThoughtsContainer extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(setUserThoughts(user.id));
  }

  render() {
    const { dispatch, thoughts } = this.props;

    const sortedByDateCreated = thoughts.sort(byCreatedDate);
    return (
      <div>
        {
          sortedByDateCreated ?
            sortedByDateCreated.map(thought => {
              return <ThoughtCard key={thought.get('id')} thought={thought} {...this.props} />
            }) :
            null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user, thoughts } = state;
  return {
    user,
    thoughts,
  }
}

export default connect(mapStateToProps)(ThoughtsContainer);
