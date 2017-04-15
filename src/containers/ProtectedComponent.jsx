import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedComponent extends React.Component {
  render() {
    const { auth } = this.props;
    const Component = this.props.component;
    if (auth) {
      return <Component {...this.props} />;
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: this.props.location,
          },
        }}
    />);
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth,
  }
}

export default connect(mapStateToProps)(ProtectedComponent);
