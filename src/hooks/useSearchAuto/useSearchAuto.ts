import { useSelectState } from '../state';
import useAppActions from '../useAppActions';
import useFipeClient from '../useFipeClient';

function useSearchAuto() {
  const fipeClient = useFipeClient();
  const { brand, model, year } = useSelectState();
  const {
    setSelected,
    startLoading,
    stopLoading,
    setAlert,
  } = useAppActions();

  const searchAuto = async () => {
    if (!brand || !model || !year) {
      return;
    }

    startLoading('all');

    try {
      setSelected('value', await fipeClient.getValueFromAuto({
        brandId: brand.id,
        modelId: model.id,
        yearId: year.id,
      }));
    } catch (e) {
      setAlert({
        type: 'error',
        message:
          'Não foi possível acessar o valor da tabela fipe, por favor tente novamente mais tarde',
      });
    } finally {
      stopLoading('all');
    }
  };

  return searchAuto;
}

export default useSearchAuto;
