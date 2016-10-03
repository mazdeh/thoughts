import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserNav from '../components/UserNav';

class Nav extends Component {
  render() {
    return(
      <div className="nav-container">
        <span className="nav-logo">T</span>

        <UserNav {...this.props} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth, user } = state;
  return {
    auth,
    user
  }
}

export default connect(mapStateToProps)(Nav);
