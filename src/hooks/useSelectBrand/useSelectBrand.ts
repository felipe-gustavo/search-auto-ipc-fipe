import type Brand from '@/types/Brand';
import useAppActions from '../useAppActions';
import useFipeClient from '../useFipeClient';

function useSelectBrand() {
  const fipeClient = useFipeClient();
  const {
    setSelected,
    setModels,
    startLoading,
    stopLoading,
    setAlert,
  } = useAppActions();

  const selectBrand = async (selected: Brand | null) => {
    setSelected('brand', selected);
    setSelected('model', null);

    if (!selected) {
      setModels(undefined);
      return;
    }

    startLoading('field.model');

    try {
      setModels(await fipeClient.getModels(selected.id));
    } catch (e) {
      setAlert({
        type: 'error',
        message:
          'Não foi possível recuperar os modelos, por favor tente novamente mais tarde',
      });
    } finally {
      stopLoading('field.model');
    }
  };

  return selectBrand;
}

export default useSelectBrand;
