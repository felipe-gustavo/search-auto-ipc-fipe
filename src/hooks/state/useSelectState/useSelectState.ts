import useAppContext from '@/hooks/useAppContext';

function useSelectState() {
  const { state } = useAppContext();

  return state.selectedAuto;
}

export default useSelectState;
