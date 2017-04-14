import React from 'react';
import { Route } from 'react-router-dom';

import ProtectedComponent from '../containers/ProtectedComponent';

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => <ProtectedComponent {...props} component={component} />} />
)

export default PrivateRoute;
