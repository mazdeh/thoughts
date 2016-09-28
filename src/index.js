import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter, Match, Miss } from 'react-router';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './containers/App';
import NoMatch from './containers/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import configureStore from './stores/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
