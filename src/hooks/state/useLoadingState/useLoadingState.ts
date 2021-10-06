import useAppContext from '@/hooks/useAppContext';

function useLoadingState() {
  const { state } = useAppContext();

  return state.isLoading;
}

export default useLoadingState;
