import useAppActions from '.';
import useAppContext from '../useAppContext';

jest.mock('../useAppContext', () => jest.fn());
jest.mock('@/actions', () => ({
  actions: {
    resetState: jest.fn().mockReturnValue('some-arg-reset'),
    setAlert: jest.fn().mockReturnValue('some-arg-alert'),
  },
}));

const dispatch = jest.fn();
useAppContext.mockReturnValue({ dispatch });

test('useAppActions', () => {
  const { resetState, setAlert } = useAppActions();

  resetState();
  expect(dispatch).toHaveBeenCalledWith('some-arg-reset');
  setAlert();
  expect(dispatch).toHaveBeenCalledWith('some-arg-alert');
});
