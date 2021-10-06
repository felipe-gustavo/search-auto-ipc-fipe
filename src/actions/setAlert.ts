import type AppActionReturnGen from '@/types/AppActionReturnGen';
import type AlertMessage from '@/types/AlertMessage';
import ActionsType from './ActionsType';

type ReturnSetAlert = AppActionReturnGen<ActionsType.SET_ALERT, AlertMessage>

const setAlert = (alert: AlertMessage): ReturnSetAlert => ({
  type: ActionsType.SET_ALERT,
  data: alert,
});

export default setAlert;
