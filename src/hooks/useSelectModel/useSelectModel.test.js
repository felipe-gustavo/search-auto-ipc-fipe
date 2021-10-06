import useSelectModel from '.';
import useAppActions from '../useAppActions';
import useFipeClient from '../useFipeClient';
import { useSelectState } from '../state';
import fixtureBrand from '@/fixture/brand';
import fixtureModel from '@/fixture/model';

jest.mock('../useAppActions', () => jest.fn());
jest.mock('../useFipeClient', () => jest.fn());
jest.mock('../state', () => ({
  useSelectState: jest.fn(),
}));

const brand = fixtureBrand();
const selectedModel = fixtureModel();
const actions = {
  setSelected: jest.fn(),
  setYears: jest.fn(),
  startLoading: jest.fn(),
  stopLoading: jest.fn(),
  setAlert: jest.fn(),
};

useSelectState.mockReturnValue({
  brand,
});
useAppActions.mockReturnValue(actions);

describe('useSelectModel', () => {
  describe('when brand is null', () => {
    beforeEach(() => {
      useSelectState.mockReturnValueOnce({
        brand: null,
      });
    });

    it('check process', async () => {
      await useSelectModel()(null);

      expect(actions.setSelected).not.toBeCalled();
    });
  });

  it('checks when model is null', async () => {
    await useSelectModel()(null);

    expect(actions.setSelected).nthCalledWith(1, 'model', null);
    expect(actions.setSelected).nthCalledWith(2, 'year', null);
    expect(actions.setYears).toHaveBeenCalledWith(undefined);
    expect(actions.startLoading).not.toBeCalled();
  });

  describe('when selectModel successful', () => {
    const getYears = jest.fn().mockImplementation(async () => 'some-years');

    beforeEach(() => {
      useFipeClient.mockReturnValue({
        getYears,
      });
    });

    it('checks proccess', async () => {
      await useSelectModel()(selectedModel);

      expect(actions.setSelected).nthCalledWith(1, 'model', selectedModel);
      expect(actions.startLoading).toHaveBeenCalledWith('field.year');
      expect(actions.stopLoading).toHaveBeenCalledWith('field.year');
      expect(getYears).toHaveBeenCalledWith(brand.id, selectedModel.id);
      expect(actions.setYears).toHaveBeenCalledWith('some-years');
    });
  });

  describe('when selectModel fails', () => {
    beforeEach(() => {
      useFipeClient.mockReturnValue({
        getModels: async () => {
          throw new Error();
        },
      });
    });

    it('checks proccess', async () => {
      await useSelectModel()(selectedModel);

      expect(actions.setAlert).toHaveBeenCalledWith({
        type: 'error',
        message: 'Não foi possível recuperar os anos do modelo selcionado, por favor tente novamente mais tarde',
      });
      expect(actions.setYears).not.toBeCalled();
    });
  });
});
