import useSelectBrand from '.';
import useAppActions from '../useAppActions';
import useFipeClient from '../useFipeClient';

jest.mock('../useAppActions', () => jest.fn());
jest.mock('../useFipeClient', () => jest.fn());

const actions = {
  setSelected: jest.fn(),
  setModels: jest.fn(),
  startLoading: jest.fn(),
  stopLoading: jest.fn(),
  setAlert: jest.fn(),
};
useAppActions.mockReturnValue(actions);

describe('useSelectBrand', () => {
  it('checks when brand is null', async () => {
    await useSelectBrand()(null);

    expect(actions.setSelected).nthCalledWith(1, 'brand', null);
    expect(actions.setSelected).nthCalledWith(2, 'model', null);
    expect(actions.setModels).toHaveBeenCalledWith(undefined);
    expect(actions.startLoading).not.toBeCalled();
  });

  describe('when selectBrand successful', () => {
    beforeEach(() => {
      useFipeClient.mockReturnValue({
        getModels: async () => 'some-models',
      });
    });

    it('checks proccess', async () => {
      await useSelectBrand()('some-brand');

      expect(actions.setSelected).nthCalledWith(1, 'brand', 'some-brand');
      expect(actions.setModels).toHaveBeenCalledWith('some-models');
      expect(actions.startLoading).toHaveBeenCalledWith('field.model');
      expect(actions.stopLoading).toHaveBeenCalledWith('field.model');
    });
  });

  describe('when selectBrand fails', () => {
    beforeEach(() => {
      useFipeClient.mockReturnValue({
        getModels: async () => {
          throw new Error();
        },
      });
    });

    it('checks proccess', () => {
      await useSelectBrand()('some-brand');

      expect(actions.setAlert).toHaveBeenCalledWith({
        type: 'error',
        message: 'Não foi possível recuperar os modelos, por favor tente novamente mais tarde',
      });
      expect(actions.setModels).not.toBeCalled();
    });
  });
});
