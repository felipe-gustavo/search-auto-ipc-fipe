import { create } from 'react-test-renderer';
import React from 'react';
import Header from '.';

describe('<Header>', () => {
  it('check renders structure', () => {
    const { toJSON } = create(<Header />);

    expect(toJSON()).toMatchSnapshot();
  });
});
