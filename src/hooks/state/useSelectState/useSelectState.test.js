import useSelectState from '.';

jest.mock('@/hooks/useAppContext', () => jest.fn().mockReturnValue({
  state: {
    selectedAuto: 'some-selected-auto-info',
  },
}));

test('useSelectState', () => {
  expect(useSelectState()).toBe('some-selected-auto-info');
});
