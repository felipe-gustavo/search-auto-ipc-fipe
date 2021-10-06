import type AppActionReturnGen from '@/types/AppActionReturnGen';
import ActionsType from './ActionsType';

type ReturnResetState = AppActionReturnGen<ActionsType.RESET_STATE, null>

const resetState = (): ReturnResetState => ({
  type: ActionsType.RESET_STATE,
  data: null,
});

export default resetState;
