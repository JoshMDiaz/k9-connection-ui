import React from 'react';
import PropTypes from 'prop-types';

const Plural = (props) => {
  return (
    <span>{props.text}{props.number === 1 ? '' : 's'}</span>
  );
}
 
export default Plural;

Plural.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};