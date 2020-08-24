import React from 'react';
import renderer from 'react-test-renderer';

import Header from './index';

it('Header renders correctly with custom title', () => {
  const header = renderer
    .create(<Header title="Test title" />)
    .toJSON();
  expect(header).toMatchSnapshot();
});

it('Header renders correctly with default title', () => {
  const header = renderer
    .create(<Header />)
    .toJSON();
  expect(header).toMatchSnapshot();
});