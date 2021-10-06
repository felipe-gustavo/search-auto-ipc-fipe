import useAutoState from '.';

jest.mock('@/hooks/useAppContext', () => jest.fn().mockReturnValue({
  state: {
    auto: 'some-auto-info',
  },
}));

test('useAutoState', () => {
  expect(useAutoState()).toBe('some-auto-info');
});
