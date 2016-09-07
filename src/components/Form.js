import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (
      <main className="new-entry">
        <h3 contentEditable="true" placeholder="Title"></h3>
        <article contentEditable="true" placeholder="Start writing..."></article>
      </main>
    )
  }

}
