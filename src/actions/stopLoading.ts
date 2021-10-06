import type Loading from '@/types/Loading';
import type DeepKeyGenUnion from '@/types/DeepKeyGenUnion';
import type AppActionReturnGen from '@/types/AppActionReturnGen';
import ActionsType from './ActionsType';

type OmitedFieldsOnObj = Omit<
  { [K in DeepKeyGenUnion<Loading, 1>]: string },
  'field'
>

type FieldsLoading = { [K in keyof OmitedFieldsOnObj]: K }[keyof OmitedFieldsOnObj];

type ReturnStopLoading = AppActionReturnGen<
  ActionsType.SET_IS_LOADING,
  {
    field: FieldsLoading,
    value: boolean,
  }
>

const stopLoading = (field: FieldsLoading): ReturnStopLoading => ({
  type: ActionsType.SET_IS_LOADING,
  data: {
    field,
    value: false,
  },
});

export default stopLoading;
