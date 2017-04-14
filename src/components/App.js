import React from 'react';

import NavContainer from '../containers/NavContainer';
import ThoughtsContainer from '../containers/ThoughtsContainer';
import '../styles/main.scss';


const App = () => (
  <div className="container">
    <NavContainer />
    <ThoughtsContainer />
  </div>
);

export default App;
