import React, { Component } from 'react';
import { Link } from 'react-router';
import dateformat from 'dateformat';

export default class ThoughtCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thought = this.props.thought.toJS();
    console.log('thought: ', thought);
    return (
      <div>
        <Link to={`me/thought/${thought.id}`}>
          <div>
            <strong>{dateformat(thought.dateCreated, "dddd, mmmm dS, yyyy")}</strong>
          </div>
        </Link>
        <div>
          <small>{thought.rawContent.blocks[0].text}</small>
        </div>
      </div>
    )
  }

}
