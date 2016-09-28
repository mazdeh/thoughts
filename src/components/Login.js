import React, { Component } from 'react';
import Form from './Form';

export default class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   this.login = this.login.bind(this);
  //   this.handleFieldChange = this.handleFieldChange.bind(this);
  //
  //   this.state = {
  //     email: '',
  //     username: '',
  //     password: ''
  //   }
  // }

  login(e) {
    // pass in form data to server
    e.preventDefault();
    console.log('log me in');
  }

  render() {
    return(
      <Form onSubmit={this.login} />
    )
  }
}
