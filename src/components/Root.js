import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import App from './App';
import Login from './Login';
import Register from './Register';
import NavContainer from '../containers/NavContainer';
import ThoughtsContainer from '../containers/ThoughtsContainer';
import ThoughtForm from './ThoughtForm';


const Root = () => (
  <div className="container">
    <Switch>
      <PrivateRoute path="/me/:id" component={ThoughtForm} />
      <PrivateRoute path="/me" component={ThoughtsContainer} />
      <Route exact path="/" component={App} />
    </Switch>
    <Route path="/" component={NavContainer} />
    <Route path="/login" component={Login} />
  </div>
);

export default Root;
