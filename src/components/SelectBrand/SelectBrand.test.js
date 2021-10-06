/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';
import fixtureAuto from '@/fixture/auto';
import fixtureSelected from '@/fixture/selected';
import { fixtureLoadingAField } from '@/fixture/loading';
import useSelectBrand from '@/hooks/useSelectBrand';
import {
  useAutoState,
  useLoadingState,
  useSelectState,
} from '@/hooks/state';
import Select from '../Select';
import SelectBrand from './SelectBrand';

jest.mock('@/hooks/state', () => ({
  useAutoState: jest.fn(),
  useLoadingState: jest.fn(),
  useSelectState: jest.fn(),
}));
jest.mock('@/hooks/useSelectBrand', () => jest.fn());
jest.mock('../Select', () => jest.fn().mockImplementation(
  (props) => {
    const ActualSelect = jest.requireActual('../Select').default;
    return <ActualSelect {...props} />;
  },
));

const component = <SelectBrand />;
const selectBrandFn = jest.fn();

useAutoState.mockReturnValue(fixtureAuto());
useLoadingState.mockReturnValue(fixtureLoadingAField('brand', false));
useSelectState.mockReturnValue(fixtureSelected());
useSelectBrand.mockReturnValue(selectBrandFn);

describe('<SelectBrand>', () => {
  it('check renders', () => {
    const { toJSON } = create(component);

    expect(toJSON()).toMatchSnapshot();
  });

  describe('when calls handleChange', () => {
    const selectedBrand = 'some-brand';

    beforeEach(() => {
      Select.mockImplementationOnce(({ onChange }) => {
        onChange(selectedBrand);
        return <div />;
      });
    });

    it('check is passing selected option to hook', () => {
      render(component);

      expect(selectBrandFn).toBeCalledWith(selectedBrand);
    });
  });
});
