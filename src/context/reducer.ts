import { curry } from 'ramda';
import type Action from '@/actions';
import { ActionsType } from '@/actions';
import assignState from '@/helpers/assignState';
import type AppState from '@/types/AppState';

const getInitialState = (): AppState => ({
  auto: {
    brands: [],
    models: undefined,
    years: undefined,
  },
  selectedAuto: {
    brand: null,
    model: null,
    year: null,
    value: null,
  },
  alert: undefined,
  isLoading: {
    all: false,
    field: {
      brand: false,
      model: false,
      year: false,
    },
  },
});

function reducer(state: AppState, action: Action): AppState {
  const assignPopuled = curry(assignState)(state);

  switch (action.type) {
    case ActionsType.SET_ALERT:
      return assignPopuled('alert', action.data, false);

    case ActionsType.SET_BRANDS:
      return assignPopuled('auto.brands', action.data, false);

    case ActionsType.SET_MODELS:
      return assignPopuled('auto.models', action.data, false);

    case ActionsType.SET_YEARS:
      return assignPopuled('auto.years', action.data, false);

    case ActionsType.SET_IS_LOADING:
      return assignPopuled(`isLoading.${action.data.field}`, action.data.value, false);

    case ActionsType.SET_SELECTED:
      return assignPopuled(`selectedAuto.${action.data.field}`, action.data.value, false);

    case ActionsType.RESET_STATE:
      return getInitialState();

    default:
      return state;
  }
}

export const initialState: AppState = getInitialState();
export default reducer;
