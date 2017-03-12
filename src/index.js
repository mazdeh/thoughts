import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter, Match, Miss } from 'react-router';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './containers/App';
import NoMatch from './containers/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import ThoughtsContainer from './containers/ThoughtsContainer';
import ThoughtDetail from './containers/ThoughtDetail';
import configureStore from './stores/configureStore';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { redirect } from './actions/users';

const store = configureStore();
// const userIsAuthenticated = UserAuthWrapper({
//   authSelector: state => state.user.profile,
//   redirectAction: redirect
// });


ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="me" component={ThoughtsContainer} />
        <Route path="me/thought/:id" component={ThoughtDetail} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
