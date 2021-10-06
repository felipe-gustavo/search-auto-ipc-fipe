import type Brand from '@/types/Brand';
import type AppActionReturnGen from '@/types/AppActionReturnGen';
import ActionsType from './ActionsType';

type ReturnSetBrands = AppActionReturnGen<ActionsType.SET_BRANDS, Brand[]>

const setBrands = (brands: Brand[]): ReturnSetBrands => ({
  type: ActionsType.SET_BRANDS,
  data: brands,
});

export default setBrands;
