import React from 'react';
import { PropTypes } from 'prop-types';
import { Route } from 'react-router-dom';

import ProtectedComponent from '../containers/ProtectedComponent';

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => <ProtectedComponent {...props} component={component} />} />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
