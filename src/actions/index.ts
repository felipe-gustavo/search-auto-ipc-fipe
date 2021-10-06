import setAlert from './setAlert';
import setYears from './setYears';
import setBrands from './setBrands';
import setModels from './setModels';
import resetState from './resetState';
import stopLoading from './stopLoading';
import setSelected from './setSelected';
import startLoading from './startLoading';

export { default as ActionsType } from './ActionsType';

type Action = ReturnType<typeof setBrands>
  | ReturnType<typeof startLoading>
  | ReturnType<typeof stopLoading>
  | ReturnType<typeof setAlert>
  | ReturnType<typeof setSelected>
  | ReturnType<typeof setModels>
  | ReturnType<typeof setYears>
  | ReturnType<typeof resetState>;

const actions = {
  setAlert,
  setYears,
  setModels,
  setBrands,
  resetState,
  stopLoading,
  setSelected,
  startLoading,
};

export { actions };
export default Action;
