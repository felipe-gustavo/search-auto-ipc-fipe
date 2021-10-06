import React from 'react';
import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';
import FormAuto from './FormAuto';
import useFetchBrands from '@/hooks/useFetchBrands';

jest.mock('@/hooks/useFetchBrands', () => jest.fn());
jest.mock('../Header', () => jest.fn().mockImplementation(
  () => <div data-testid="header" />,
));
jest.mock('../LoadingBackdrop', () => jest.fn().mockImplementation(
  ({ children }) => <div data-testid="loading">{children}</div>,
));
jest.mock('../SelectYear', () => jest.fn().mockImplementation(
  () => <div data-testid="select-year" />,
));
jest.mock('../SelectBrand', () => jest.fn().mockImplementation(
  () => <div data-testid="select-brand" />,
));
jest.mock('../SelectModel', () => jest.fn().mockImplementation(
  () => <div data-testid="select-model" />,
));
jest.mock('../ButtonSearch', () => jest.fn().mockImplementation(
  () => <div data-testid="button-search" />,
));

const fetchBrands = jest.fn();
useFetchBrands.mockReturnValue(fetchBrands);

describe('<FormAuto>', () => {
  it('checks renders structure', () => {
    const { toJSON } = create(<FormAuto />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('checks useEffect call fetchBrands', () => {
    render(<FormAuto />);

    expect(fetchBrands).toHaveBeenCalledTimes(1);
  });
});
