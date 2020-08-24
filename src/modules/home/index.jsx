import React from 'react';
import Header from '@shared/header';
import { APP_NAME } from '@constants';

export default function Home() {
  const title = `${ APP_NAME } template`;
  return (
    <Header title={ title } />
  );
}
