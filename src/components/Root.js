import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import App from './App';
import Login from './Login';
import Register from './Register';

const Root = () => (
  <div>
    <PrivateRoute path="/" component={App} />
    <Route path="/login" component={Login} />
  </div>
);

export default Root;
