import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './containers/App';
import NoMatch from './containers/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import configureStore from './stores/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={App} />
        <Match pattern="/register" component={Register} />
        <Match pattern="/login" component={Login} />
        <Miss component={NoMatch} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
