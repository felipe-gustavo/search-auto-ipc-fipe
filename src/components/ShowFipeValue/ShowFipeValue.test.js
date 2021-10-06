import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import {
  act as rendererAct,
  create,
} from 'react-test-renderer';
import useShowAutoValue from '@/hooks/state/useShowAutoValue';
import useAppActions from '@/hooks/useAppActions';
import ShowFipeValue from '.';
import {
  fixtureAutoValueComplete,
  fixtureAutoValueIncomplete,
} from '@/fixture/autoValue';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));
jest.mock('@/hooks/state/useShowAutoValue', () => jest.fn());
jest.mock('@/hooks/useAppActions', () => jest.fn());

const component = <ShowFipeValue />;
const resetState = jest.fn();
const autoValueComplete = fixtureAutoValueComplete();
const autoValueIncomplete = fixtureAutoValueIncomplete();
useAppActions.mockReturnValue({ resetState });

describe('<ShowFipeValue>', () => {
  describe('when search is concluded', () => {
    beforeEach(() => {
      useShowAutoValue.mockReturnValue(autoValueComplete);
    });

    it('check renders', () => {
      rendererAct(() => {});
      const { toJSON } = create(component);

      expect(toJSON()).toMatchSnapshot();
    });

    it('check showing correct values', () => {
      render(component);

      expect(screen.getByText(
        `Tabela Fipe: ${autoValueComplete.autoName}`,
      )).toBeInTheDocument();

      expect(screen.getByText(
        autoValueComplete.value,
      )).toBeInTheDocument();
    });

    it('checks reset link', () => {
      render(component);

      const link = screen.getByTestId('linkReset');
      fireEvent.click(link);

      expect(resetState).toHaveBeenCalledTimes(1);
    });
  });

  describe('when search not is concluded', () => {
    beforeEach(() => {
      useShowAutoValue.mockReturnValue(autoValueIncomplete);
    });

    it('check renders', () => {
      rendererAct(() => {});
      const { toJSON } = create(component);

      expect(toJSON()).toMatchSnapshot();
    });
  });
});
