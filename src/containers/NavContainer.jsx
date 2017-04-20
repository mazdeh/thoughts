import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserNav from '../components/UserNav';

const NavContainer = ({ user }) => (
  <div className="nav-container">
    <span className="nav-logo">T</span>
    <UserNav user={user} />
  </div>
);

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

NavContainer.propTypes = {
  user: PropTypes.objecOf({
    id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};
export default connect(mapStateToProps)(NavContainer);
