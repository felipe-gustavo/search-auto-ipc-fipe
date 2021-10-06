import useAppContext from '@/hooks/useAppContext';

function useAutoState() {
  const { state } = useAppContext();

  return state.auto;
}

export default useAutoState;
