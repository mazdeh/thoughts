import React from 'react';
import { Link } from 'react-router-dom';

import NavContainer from '../containers/NavContainer';
import '../styles/main.scss';

const App = () => (
  <Link to="/me">Your Thoughts</Link>
);

export default App;
