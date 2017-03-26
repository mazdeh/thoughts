import React, { Component } from 'react';
import { Link } from 'react-router';
import dateformat from 'dateformat';

export default class ThoughtCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thought = this.props.thought.toJS();

    return (
      <Link to={`me/thought/${thought.id}`}>
        <div>
          {dateformat(thought.dateCreated, "dddd, mmmm dS, yyyy")}
        </div>
      </Link>
    )
  }

}
