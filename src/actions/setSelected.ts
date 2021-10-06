import type AppActionReturnGen from '@/types/AppActionReturnGen';
import type AppState from '@/types/AppState';
import ActionsType from './ActionsType';

type SelectedAutoType = AppState['selectedAuto']

type ReturnSetSelected<T extends keyof SelectedAutoType> = AppActionReturnGen<
  ActionsType.SET_SELECTED, {
    field: keyof SelectedAutoType,
    value: SelectedAutoType[T]
  }
>

const setSelected = <T extends keyof SelectedAutoType>(
  field: T, value: SelectedAutoType[T],
): ReturnSetSelected<T> => ({
    type: ActionsType.SET_SELECTED,
    data: {
      field,
      value,
    },
  });

export default setSelected;
