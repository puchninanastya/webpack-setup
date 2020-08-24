/* global APP_ENV */
import React from 'react';
import Header from '@shared/header';

const isProd = APP_ENV === 'prod';

export default function About() {
  const title = isProd ? 'About setup title' : 'Kek';

  return (
    <Header title={ title } />
  );
}
