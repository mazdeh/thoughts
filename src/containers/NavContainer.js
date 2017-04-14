import React from 'react';
import { connect } from 'react-redux';

import UserNav from '../components/UserNav';

const NavContainer = ({ user }) => (
  <div className="nav-container">
    <span className="nav-logo">T</span>
    <UserNav user={user} />
  </div>
)


function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps)(NavContainer);
