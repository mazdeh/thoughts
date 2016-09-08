import React, { Component } from 'react';

export default class Thought extends Component {
  render() {
    const { thought } = this.props;
    return <div>{thought}</div>
  }
}
