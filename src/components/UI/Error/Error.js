import PropTypes from 'prop-types';
import React from 'react';

const Error = ({error}) => {
  return error ? (
    <div>
      {error}
    </div>
  ) : null;
}

Error.propTypes = {
  error: PropTypes.string
}

export default Error
