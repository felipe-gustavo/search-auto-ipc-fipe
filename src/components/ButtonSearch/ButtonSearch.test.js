import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import brandFixture from '@/fixture/brand';
import modelFixture from '@/fixture/model';
import yearFixture from '@/fixture/year';
import valueFixture from '@/fixture/value';

import useSearchAuto from '@/hooks/useSearchAuto';
import { useSelectState } from '@/hooks/state';
import ButtonSearch from './ButtonSearch';

jest.mock('@/hooks/state', () => ({
  useSelectState: jest.fn(),
}));

useSelectState.mockReturnValue({
  brand: brandFixture(),
  model: modelFixture(),
  year: yearFixture(),
  value: valueFixture(),
});

jest.mock('@/hooks/useSearchAuto', () => jest.fn());

describe('<ButtonSearch>', () => {
  it('check renders', () => {
    const { toJSON } = create(<ButtonSearch />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('must call useSearchAuto', () => {
    render(<ButtonSearch />);

    const button = screen.queryByTestId('button-search');
    fireEvent.click(button);

    expect(useSearchAuto).toHaveBeenCalledTimes(1);
  });

  describe('when an selected value is not setted', () => {
    useSelectState.mockReturnValue({
      brand: brandFixture(),
      model: modelFixture(),
      year: null,
      value: valueFixture(),
    });

    it('check Button is disabled', () => {
      render(<ButtonSearch />);

      const button = screen.queryByTestId('button-search');
      expect(button).toHaveAttribute('disabled');
    });
  });
});
