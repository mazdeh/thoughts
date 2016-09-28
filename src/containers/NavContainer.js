import React, { Component } from 'react';
import { Link } from 'react-router';

import UserCenter from '../components/UserCenter';

class Nav extends Component {
  render() {
    return(
      <div className="nav-container">
        <span className="nav-logo">T</span>

        <UserCenter {...this.props} />
      </div>
    )
  }
}

mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps)(Nav);
