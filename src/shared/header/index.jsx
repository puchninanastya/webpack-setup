import React from 'react';
import PropTypes from 'prop-types';

import style from './style';

export default function Header({ title }) {
  return (
    <h1 className={ style.header }>
      { title }
    </h1>
  );
}

Header.propTypes = {
  /* Title text */
  title: PropTypes.string
};

Header.defaultProps = {
  title: 'Hi there'
};
