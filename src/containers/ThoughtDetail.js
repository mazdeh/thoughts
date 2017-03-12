import React, { Component } from 'react';
import { connect } from 'react-redux';

import ThoughtForm from '../components/ThoughtForm';

class ThoughtDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thoughtId = this.props.params.id;
    const { thoughts, dispatch } = this.props;
    let thought = thoughts.find((thought) => {
      return thought.get('id') === thoughtId;
    })

    return (
      <div>
        <ThoughtForm thought={thought} dispatch={dispatch} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { thoughts } = state.user;
  return {
    thoughts
  }
}

export default connect(mapStateToProps)(ThoughtDetail);
