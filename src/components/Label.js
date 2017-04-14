import React from 'react';

const Label = props => (
  <label htmlFor={props.htmlFor} {...props} />
);

export default Label;
