/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { create } from 'react-test-renderer';
import { Collapse } from '@material-ui/core';
import { render, screen } from '@testing-library/react';
import fixtureAuto from '@/fixture/auto';
import fixtureSelected from '@/fixture/selected';
import { fixtureLoadingAField } from '@/fixture/loading';
import useAppActions from '@/hooks/useAppActions';
import {
  useAutoState,
  useLoadingState,
  useSelectState,
} from '@/hooks/state';
import Select from '../Select';
import SelectYear from './SelectYear';

jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  Collapse: jest.fn().mockImplementation(
    (props) => {
      const ActualCollapse = jest.requireActual('@material-ui/core').Collapse;
      return <ActualCollapse {...props} />;
    },
  ),
}));
jest.mock('@/hooks/state', () => ({
  useAutoState: jest.fn(),
  useLoadingState: jest.fn(),
  useSelectState: jest.fn(),
}));
jest.mock('@/hooks/useAppActions', () => jest.fn());
jest.mock('../Select', () => jest.fn().mockImplementation(
  (props) => {
    const ActualSelect = jest.requireActual('../Select').default;
    return <ActualSelect {...props} />;
  },
));

const component = <SelectYear />;
const setSelected = jest.fn();

useAutoState.mockReturnValue(fixtureAuto());
useLoadingState.mockReturnValue(fixtureLoadingAField('year', false));
useSelectState.mockReturnValue(fixtureSelected());
useAppActions.mockReturnValue({ setSelected });

describe('<SelectYear>', () => {
  it('check renders', () => {
    const { toJSON } = create(component);

    expect(toJSON()).toMatchSnapshot();
  });

  describe('when calls handleChange with year populed', () => {
    const selectedYear = 'some-year';

    beforeEach(() => {
      Select.mockImplementationOnce(({ onChange }) => {
        onChange(selectedYear);
        return <div />;
      });
    });

    it('check is passing selected option to hook', () => {
      render(component);

      expect(setSelected).toBeCalledWith('year', selectedYear);
    });
  });

  describe('when calls handleChange with year null', () => {
    const selectedYear = null;

    beforeEach(() => {
      Select.mockImplementationOnce(({ onChange }) => {
        onChange(selectedYear);
        return <div />;
      });
    });

    it('check is passing selected option to hook', () => {
      render(component);

      expect(setSelected).toBeCalledWith('year', null);
      expect(setSelected).toHaveBeenLastCalledWith('value', null);
    });
  });

  describe('when models is', () => {
    beforeEach(() => {
      Collapse.mockImplementationOnce(({ in: mustShow, children }) => (
        <div className="collapse">
          {mustShow && (
          <div data-testid="insideCollapse">
            {children}
          </div>
          )}
        </div>
      ));
    });

    describe('not selected', () => {
      beforeEach(() => {
        useSelectState.mockReturnValueOnce(fixtureSelected({
          model: null,
        }));
      });

      it('check if select appears', () => {
        render(component);

        const collapseContent = screen.queryByTestId('insideCollapse');

        expect(collapseContent).toBe(null);
      });
    });

    describe('selected', () => {
      it('check if select appears', () => {
        render(component);

        const collapseContent = screen.getByTestId('insideCollapse');

        expect(collapseContent).toBeInTheDocument();
      });
    });
  });
});
