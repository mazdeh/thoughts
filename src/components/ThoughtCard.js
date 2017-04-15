import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import dateformat from 'dateformat';

const ThoughtCard = props => {
  const thought = props.thought.toJS();
  return (
    <div>
      <Link to={`/me/${thought.id}`}>
        <strong>{dateformat(thought.dateCreated, "dddd, mmmm dS, yyyy")}</strong>
      </Link>
      <div>
        <small>{thought.rawContent ? thought.rawContent.blocks[0].text : null}</small>
      </div>
    </div>
  )
}

export default ThoughtCard;
