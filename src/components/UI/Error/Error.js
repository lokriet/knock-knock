import PropTypes from 'prop-types';
import React from 'react';

import classes from './Error.module.scss';

const Error = ({ error, className }) => {
  let classList = [classes.Error];
  if (className) {
    classList.push(className);
  }
  return error ? <div className={classList.join(' ')}>Oh no! {error}</div> : null;
};

Error.propTypes = {
  error: PropTypes.string
};

export default Error;
