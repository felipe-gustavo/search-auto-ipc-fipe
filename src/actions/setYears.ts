import type Year from '@/types/Year';
import type AppActionReturnGen from '@/types/AppActionReturnGen';
import ActionsType from './ActionsType';

type ReturnSetYears = AppActionReturnGen<ActionsType.SET_YEARS, Year[] | undefined>

const setYears = (brands?: Year[]): ReturnSetYears => ({
  type: ActionsType.SET_YEARS,
  data: brands,
});

export default setYears;
