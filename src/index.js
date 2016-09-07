import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import configureStore from './stores/configureStore';

const store = configureStore();

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
);
