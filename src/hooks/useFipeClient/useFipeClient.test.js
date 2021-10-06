import useFipeClient from '.';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: () => ({
    current: 'some-fipe-client',
  }),
}));

test('useFipeClient', () => {
  expect(useFipeClient()).toEqual('some-fipe-client');
});
