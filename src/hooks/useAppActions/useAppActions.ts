import { actions } from '@/actions';
import useAppContext from '../useAppContext';

type Actions = typeof actions
type ActionKey = keyof Actions
type DispatchActions = { [K in ActionKey]: (...args: Parameters<Actions[K]>) => void }

function useAppActions() {
  const { dispatch } = useAppContext();

  return Object.keys(actions).reduce((allActions, actionKey) => {
    const action = actions[actionKey as ActionKey];
    return {
      ...allActions,
      [actionKey]: (...args: Parameters<typeof action>) => (
        // @ts-ignore: Unreachable code error
        dispatch(action(...args))
      ),
    };
  }, {}) as DispatchActions;
}

export default useAppActions;
