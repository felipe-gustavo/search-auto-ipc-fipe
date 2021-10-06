import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { omit } from 'lodash';

import * as notistack from 'notistack';
import { useAlertState } from '@/hooks/state';
import AlertMessage from './AlertMessage';

const enqueueSnackbar = jest.fn();

const alert = {
  type: 'success',
  message: 'some-message',
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn().mockImplementation((f) => f()),
}));

jest.mock('@/hooks/state', () => ({
  useAlertState: jest.fn(),
}));

useAlertState.mockImplementation(() => alert);

describe('<AlertMessage>', () => {
  jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => ({
    enqueueSnackbar,
    closeSnackbar: jest.fn(),
  }));

  it('checks tree', () => {
    const { toJSON } = create(<AlertMessage />);
    expect(toJSON()).toMatchSnapshot();
  });

  describe('when renders', () => {
    beforeEach(() => {
      render(<AlertMessage />);
    });

    it('checks effect when rerender', async () => {
      expect(useEffect).toHaveBeenCalledTimes(1);
    });

    it('checks dispatch alert', () => {
      const [arg0, arg1] = enqueueSnackbar.mock.calls[0];

      expect(arg0).toEqual(alert.message);
      expect(typeof arg1.action).toBe('function');
      expect(omit(arg1, ['action'])).toEqual({
        variant: alert.type,
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
      });
    });
  });
});
