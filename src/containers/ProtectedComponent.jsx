import React from 'react';
import PropTypes from 'prop-types';
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
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

ProtectedComponent.propTypes = {
  auth: PropTypes.bool.isRequired,
  component: PropTypes.oneOf([
    PropTypes.component,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  location: PropTypes.objectOf({
    state: PropTypes.object,
  }),
};

ProtectedComponent.defaultProps = {
  location: null,
};

export default connect(mapStateToProps)(ProtectedComponent);
