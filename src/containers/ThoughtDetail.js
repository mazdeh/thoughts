import React, { Component } from 'react';
import { connect } from 'react-redux';

class ThoughtDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('this.props: ', this.props);
    console.log('id: ', this.props.params.id);
    const { thoughts } = this.props;
    // const thought = thoughts.find()
    return (
      <div>sure</div>
    )
  }
}

function mapStateToProps(state) {
  const { thoughts } = state;
  return {
    thoughts
  }
}

export default connect(mapStateToProps)(ThoughtDetail);
