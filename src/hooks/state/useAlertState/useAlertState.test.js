import useAlertState from '.';

jest.mock('@/hooks/useAppContext', () => jest.fn().mockReturnValue({
  state: {
    alert: 'some-alert',
  },
}));

test('useAlertState', () => {
  expect(useAlertState()).toBe('some-alert');
});
