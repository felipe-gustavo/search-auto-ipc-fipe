import useFetchBrands from '.';
import useAppActions from '../useAppActions';
import useFipeClient from '../useFipeClient';

jest.mock('../useAppActions', () => jest.fn());
jest.mock('../useFipeClient', () => jest.fn().mockReturnValue({
  getBrands: async () => 'some-brands',
}));

const actions = {
  setAlert: jest.fn(),
  setBrands: jest.fn(),
  setSelected: jest.fn(),
  stopLoading: jest.fn(),
  startLoading: jest.fn(),
};
useAppActions.mockReturnValue(actions);

describe('useFetchBrands', () => {
  describe('when fetchBrands succesfull', () => {
    it('check process', async () => {
      const fetchBrands = useFetchBrands();

      await fetchBrands();

      expect(actions.setBrands).toBeCalledWith([]);
      expect(actions.setSelected).toHaveBeenCalledWith('brand', null);
      expect(actions.startLoading).toHaveBeenCalledWith('field.brand');
      expect(actions.setBrands).toHaveBeenLastCalledWith('some-brands');
      expect(actions.stopLoading).toHaveBeenCalledWith('field.brand');
    });
  });

  describe('when fetchBrands fails', () => {
    beforeEach(() => {
      useFipeClient.mockReturnValue({
        getBrands: async () => {
          throw new Error();
        },
      });
    });

    it('check process', async () => {
      const fetchBrands = useFetchBrands();

      await fetchBrands();

      expect(actions.setBrands).toHaveBeenLastCalledWith([]);
      expect(actions.setAlert)
        .toHaveBeenCalledWith({
          type: 'error',
          message: 'Houve um erro ao pegar as marcas, tente novamente mais tarde',
        });
      expect(actions.stopLoading).toHaveBeenCalledWith('field.brand');
    });
  });
});
