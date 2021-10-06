import useSearchAuto from '.';
import useAppActions from '../useAppActions';
import useFipeClient from '../useFipeClient';
import { useSelectState } from '../state';
import fixtureSelected from '@/fixture/selected';

jest.mock('../useAppActions', () => jest.fn());
jest.mock('../state', () => ({
  useSelectState: jest.fn(),
}));
jest.mock('../useFipeClient', () => jest.fn().mockReturnValue({
  getValueFromAuto: async () => 'some-value',
}));

const actions = {
  setAlert: jest.fn(),
  setBrands: jest.fn(),
  setSelected: jest.fn(),
  stopLoading: jest.fn(),
  startLoading: jest.fn(),
};
const populedSelected = fixtureSelected();
useAppActions.mockReturnValue(actions);

describe('useSearchAuto', () => {
  describe('when disabled to act', () => {
    it('checks calls nothing', () => {
      expect(actions.startLoading).not.toBeCalled();
    });
  });

  describe('when able to act', () => {
    beforeEach(() => {
      useSelectState.mockReturnValue(populedSelected);
    });

    describe('when searchAuto successful', () => {
      const getValueFromAuto = jest.fn().mockImplementation(async () => 'some-value');

      beforeEach(() => {
        useFipeClient.mockReturnValue({
          getValueFromAuto,
        });
      });

      it('checks process', async () => {
        const searchAuto = useSearchAuto();

        await searchAuto();

        expect(actions.startLoading).toHaveBeenCalledWith('all');
        expect(actions.setSelected).toHaveBeenCalledWith('value', 'some-value');
        const { brand, model, year } = populedSelected;
        expect(getValueFromAuto).toHaveBeenCalledWith({
          brandId: brand.id,
          modelId: model.id,
          yearId: year.id,
        });
        expect(actions.stopLoading).toHaveBeenCalledWith('all');
      });
    });

    describe('when searchAuto successful', () => {
      beforeEach(() => {
        useFipeClient.mockReturnValue({
          getValueFromAuto: async () => {
            throw new Error();
          },
        });
      });

      it('checks process', async () => {
        const searchAuto = useSearchAuto();

        await searchAuto();

        expect(actions.startLoading).toHaveBeenCalledWith('all');
        expect(actions.setSelected).not.toBeCalled();
        expect(actions.setAlert).toHaveBeenCalledWith({
          type: 'error',
          message: 'Não foi possível acessar o valor da tabela fipe, por favor tente novamente mais tarde',
        });
      });
    });
  });
});
