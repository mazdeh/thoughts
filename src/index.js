import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// import App from './containers/App';
// import NoMatch from './containers/NoMatch';
// import Login from './components/Login';
// import Register from './components/Register';
// import ThoughtsContainer from './containers/ThoughtsContainer';
// import ThoughtDetail from './containers/ThoughtDetail';
import Root from './components/Root';

import configureStore from './stores/configureStore';

const store = configureStore();

// <Route path="/" component={App}>
//   <Route path="me" component={ThoughtsContainer} />
//   <Route path="me/thought/:id" component={ThoughtDetail} />
//   <Route path="register" component={Register} />
//   <Route path="login" component={Login} />
// </Route>

ReactDOM.render(
  <Provider store={store} >
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('app')
);
