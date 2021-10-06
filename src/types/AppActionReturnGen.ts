import ActionsType from '@/actions/ActionsType';

type AppActionReturnGen<R extends ActionsType, T> = {
  type: R,
  data: T,
}

export default AppActionReturnGen;
