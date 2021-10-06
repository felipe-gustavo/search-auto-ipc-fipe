import useAppContext from '@/hooks/useAppContext';

function useAlertState() {
  const { state } = useAppContext();

  return state.alert;
}

export default useAlertState;
