import useAppActions from '../useAppActions';
import useFipeClient from '../useFipeClient';

function useFetchBrands() {
  const fipeClient = useFipeClient();
  const {
    setAlert,
    setBrands,
    setSelected,
    stopLoading,
    startLoading,
  } = useAppActions();

  const fetchBrands = async () => {
    setBrands([]);
    setSelected('brand', null);
    startLoading('field.brand');
    try {
      setBrands(await fipeClient.getBrands());
    } catch (e) {
      setAlert({
        type: 'error',
        message: 'Houve um erro ao pegar as marcas, tente novamente mais tarde',
      });
    } finally {
      stopLoading('field.brand');
    }
  };

  return fetchBrands;
}

export default useFetchBrands;
