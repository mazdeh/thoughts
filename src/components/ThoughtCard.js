import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class ThoughtCard extends Component {
  constructor(props) {
    super(props);
    this.navigateToThought = this.navigateToThought.bind(this);
  }

  navigateToThought() {
    const thought = this.props.thought.toJS();
    browserHistory.push('/me/thought/' + thought.id);
  }

  render() {
    const thought = this.props.thought.toJS();

    return (
      <div onClick={this.navigateToThought}>
        {thought.dateCreated}
      </div>
    )
  }

}
