import { useContext } from 'react';
import useAppContext from '.';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
    .mockReturnValue(['some-state', 'some-dispatch']),
}));
jest.mock('@/context', () => 'some-context');

describe('useAppContext', () => {
  describe('when try run out of AppProvider', () => {
    beforeEach(() => {
      useContext.mockReturnValueOnce(undefined);
    });

    it('checks throwing', () => {
      expect(() => useAppContext()).toThrowError('Use `useContext` inside `AppProvider`');
    });
  });

  it('checks createContext', () => {
    useAppContext();

    expect(useContext).toBeCalledWith('some-context');
  });

  it('checks return state and context', () => {
    expect(useAppContext()).toEqual(['some-state', 'some-dispatch']);
  });
});
