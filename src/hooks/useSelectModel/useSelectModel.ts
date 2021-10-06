import type Model from '@/types/Model';
import { useSelectState } from '../state';
import useAppActions from '../useAppActions';
import useFipeClient from '../useFipeClient';

function useSelectModel() {
  const fipeClient = useFipeClient();
  const { brand } = useSelectState();
  const {
    setSelected,
    setYears,
    startLoading,
    stopLoading,
    setAlert,
  } = useAppActions();

  const selectModel = async (selected: Model | null) => {
    if (!brand) {
      return;
    }

    setSelected('model', selected);
    setSelected('year', null);

    if (!selected) {
      setYears(undefined);
      return;
    }

    startLoading('field.year');

    try {
      setYears(await fipeClient.getYears(brand.id, selected.id));
    } catch (e) {
      setAlert({
        type: 'error',
        message:
          'Não foi possível recuperar os anos do modelo selcionado, por favor tente novamente mais tarde',
      });
    } finally {
      stopLoading('field.year');
    }
  };

  return selectModel;
}

export default useSelectModel;
