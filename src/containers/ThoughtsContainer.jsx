import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { byCreatedDate } from '../utils/util';

import ThoughtCard from '../components/ThoughtCard';
import { setUserThoughts } from '../actions/thoughts';

class ThoughtsContainer extends Component {
  componentDidMount() {
    const { dispatch, user, thoughts } = this.props;
    if (!thoughts && user) {
      dispatch(setUserThoughts(user.id));
    }
  }

  render() {
    const { thoughts } = this.props;

    const sortedByDateCreated = thoughts.sort(byCreatedDate);
    return (
      <div>
        {
          sortedByDateCreated ?
            sortedByDateCreated.map(thought => (
              <ThoughtCard key={thought.get('id')} thought={thought} {...this.props} />
            )) :
            null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, thoughts } = state;
  return {
    user,
    thoughts,
  };
}

ThoughtsContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  thoughts: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ThoughtsContainer);
