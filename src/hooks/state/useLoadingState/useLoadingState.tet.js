import useLoadingState from '.';

jest.mock('@/hooks/useAppContext', () => jest.fn().mockReturnValue({
  state: {
    isLoading: 'some-loading-info',
  },
}));

test('useLoadingState', () => {
  expect(useLoadingState()).toBe('some-loading-info');
});
