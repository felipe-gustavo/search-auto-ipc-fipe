import {
  get, set, merge,
} from 'lodash';
import type AppState from '@/types/AppState';
import type DeepKeyGenUnion from '@/types/DeepKeyGenUnion';

const assignState = (
  state: AppState,
  path: DeepKeyGenUnion<AppState, 2>,
  value: unknown,
  mustMerge = false,
) => {
  let newValue = value;
  const oldValue = get(state, path);

  if (mustMerge
    && typeof value === 'object'
    && typeof newValue === 'object'
  ) {
    newValue = merge(value, oldValue);
  }

  return { ...set(state, path, newValue) } as AppState;
};

export default assignState;
