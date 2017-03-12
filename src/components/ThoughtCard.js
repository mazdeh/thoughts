import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ThoughtCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thought = this.props.thought.toJS();

    return (
      <Link to={`me/thought/${thought.id}`}>
        <div>
          {thought.dateCreated}
        </div>
      </Link>
    )
  }

}
