import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import LoadingBackdrop from '.';
import { useLoadingState } from '@/hooks/state';
import { fixtureLoadingAll } from '@/fixture/loading';

jest.mock('@/hooks/state', () => ({
  useLoadingState: jest.fn(),
}));

const chldren = <div>some-children</div>;
const component = <LoadingBackdrop>{chldren}</LoadingBackdrop>;

describe('<LoadingBackdrop>', () => {
  describe('when is Loading all is true', () => {
    beforeEach(() => {
      useLoadingState.mockReturnValue(fixtureLoadingAll(true));
    });

    it('check renders structure', () => {
      const { toJSON } = create(component);

      expect(toJSON()).toMatchSnapshot();
    });

    it('check container loading progress is visible', () => {
      render(component);

      const container = screen.getByTestId('containerLoading');

      expect(container).toHaveAttribute('hidden');
    });

    it('check fieldset has been disabled', () => {
      render(component);

      const fieldset = screen.getByTestId('fieldset');
      expect(fieldset).toHaveAttribute('disabled');
    });
  });

  describe('when is Loading all is false', () => {
    beforeEach(() => {
      useLoadingState.mockReturnValue(fixtureLoadingAll(false));
    });

    it('check renders structure', () => {
      const { toJSON } = create(component);

      expect(toJSON()).toMatchSnapshot();
    });

    it('check container loading progress not is visible', () => {
      render(component);

      const container = screen.getByTestId('containerLoading');

      expect(container).not.toBeVisible();
    });

    it('check fieldset has been able', () => {
      render(component);

      const fieldset = screen.getByTestId('fieldset');

      expect(fieldset.getAttribute('disabled')).toBe(null);
    });
  });
});
