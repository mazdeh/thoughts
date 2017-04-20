import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dateformat from 'dateformat';

// import setSelectedThought from '../actions/selectedThought';

class ThoughtCard extends Component {

  handleClick = (thoughtId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'SELECTED_THOUGHT',
      thoughtId,
    });
  }

  render() {
    const { thought } = this.props;
    return (
      <div>
        <button onClick={() => this.handleClick(thought.get('id'))} >
          <Link to={`/me/${thought.get('id')}`}>
            <strong>{dateformat(thought.get('dateCreated'), 'dddd, mmmm dS, yyyy')}</strong>
          </Link>
        </button>
        <div>
          <small>{thought.get('rawContent') ? thought.get('rawContent').blocks[0].text : null}</small>
        </div>
      </div>
    );
  }
}

ThoughtCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  thought: PropTypes.shape({
    id: PropTypes.string,
    dateCreated: PropTypes.string,
  }).isRequired,
};

export default connect()(ThoughtCard);
