import React from 'react';
import PropTypes from 'prop-types';

const Label = props => (
  <label htmlFor={props.htmlFor} {...props} />
);

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
};

export default Label;
