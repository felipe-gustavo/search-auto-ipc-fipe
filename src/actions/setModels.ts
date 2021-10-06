import type Model from '@/types/Model';
import type AppActionReturnGen from '@/types/AppActionReturnGen';
import ActionsType from './ActionsType';

type ReturnSetModels = AppActionReturnGen<ActionsType.SET_MODELS, Model[] | undefined>

const setModels = (models?: Model[]): ReturnSetModels => ({
  type: ActionsType.SET_MODELS,
  data: models,
});

export default setModels;
