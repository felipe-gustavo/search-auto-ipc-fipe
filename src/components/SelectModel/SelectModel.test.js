/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';
import fixtureAuto from '@/fixture/auto';
import fixtureSelected from '@/fixture/selected';
import { fixtureLoadingAField } from '@/fixture/loading';
import useSelectModel from '@/hooks/useSelectModel';
import {
  useAutoState,
  useLoadingState,
  useSelectState,
} from '@/hooks/state';
import Select from '../Select';
import SelectModel from './SelectModel';

jest.mock('@/hooks/state', () => ({
  useAutoState: jest.fn(),
  useLoadingState: jest.fn(),
  useSelectState: jest.fn(),
}));
jest.mock('@/hooks/useSelectModel', () => jest.fn());
jest.mock('../Select', () => jest.fn().mockImplementation(
  (props) => {
    const ActualSelect = jest.requireActual('../Select').default;
    return <ActualSelect {...props} />;
  },
));

const component = <SelectModel />;
const selectModelFn = jest.fn();

useAutoState.mockReturnValue(fixtureAuto());
useLoadingState.mockReturnValue(fixtureLoadingAField('model', false));
useSelectState.mockReturnValue(fixtureSelected());
useSelectModel.mockReturnValue(selectModelFn);

describe('<SelectModel>', () => {
  it('check renders', () => {
    const { toJSON } = create(component);

    expect(toJSON()).toMatchSnapshot();
  });

  describe('when calls handleChange', () => {
    const selectedModel = 'some-model';

    beforeEach(() => {
      Select.mockImplementationOnce(({ onChange }) => {
        onChange(selectedModel);
        return <div />;
      });
    });

    it('check is passing selected option to hook', () => {
      render(component);

      expect(selectModelFn).toBeCalledWith(selectedModel);
    });
  });
});
