import React, { useEffect } from 'react';
import { render, screen, act } from '@testing-library/react';
import { create, act as rendererAct } from 'react-test-renderer';
import {
  fixtureAutoValueComplete,
  fixtureAutoValueIncomplete,
} from '@/fixture/autoValue';
import useShowAutoValue from '@/hooks/state/useShowAutoValue';
import Container from './Container';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn().mockImplementation(
    jest.requireActual('react').useEffect,
  ),
}));
jest.mock('@/hooks/state/useShowAutoValue', () => jest.fn());
jest.mock('@material-ui/core', () => ({
  ...jest.requireActual('@material-ui/core'),
  Slide: jest.fn().mockImplementation(({ in: inDisplay, children }) => (
    inDisplay ? children : null
  )),
}));
jest.mock('../FormAuto', () => (
  jest.fn().mockImplementation(() => <div data-testid="form" />)
));
jest.mock('../ShowFipeValue', () => (
  jest.fn().mockImplementation(() => <div data-testid="banner-value" />)));

const autoValueComplete = fixtureAutoValueComplete();
const autoValueIncomplete = fixtureAutoValueIncomplete();

describe('<Container>', () => {
  describe('when autoValue is complete', () => {
    beforeEach(() => {
      useShowAutoValue.mockReturnValue(autoValueComplete);
    });

    it('check renders structure', async () => {
      jest.useFakeTimers();
      let toJSON;

      rendererAct(() => {
        toJSON = create(<Container />).toJSON;
        jest.runAllTimers();
      });
      // setTimeout(() => {
      expect(toJSON()).toMatchSnapshot();
      // }, 1000);
    });

    it('check renders banner-value is visible', async () => {
      jest.useFakeTimers();

      act(() => {
        render(<Container />);
        jest.runAllTimers();
      });
      const form = await screen.findByTestId('banner-value');

      expect(form).toBeVisible();
    });
  });

  describe('when autoValue is incomplete', () => {
    beforeEach(() => {
      useShowAutoValue.mockReturnValue(autoValueIncomplete);
      useEffect.mockImplementationOnce(() => jest.fn());
    });

    it('check renders structure', async () => {
      const { toJSON } = await create(<Container />);

      expect(toJSON()).toMatchSnapshot();
    });

    it('check renders form is visible', async () => {
      render(<Container />);
      const form = await screen.findByTestId('form');

      expect(form).toBeVisible();
    });
  });
});
