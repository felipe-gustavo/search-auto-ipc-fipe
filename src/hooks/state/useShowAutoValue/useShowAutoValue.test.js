import fixtureBrand from '@/fixture/brand';
import fixtureModel from '@/fixture/model';
import fixtureValue from '@/fixture/value';
import fixtureYear from '@/fixture/year';
import useShowAutoValue from '.';
import useSelectState from '../useSelectState';

jest.mock('../useSelectState', () => jest.fn());

const populedSelectState = {
  brand: fixtureBrand(),
  model: fixtureModel(),
  year: fixtureYear(),
  value: fixtureValue(),
};

describe('useShowAutoValue', () => {
  describe('when must show', () => {
    beforeEach(() => {
      useSelectState.mockReturnValue(populedSelectState);
    });

    it('checks value', () => {
      const result = useShowAutoValue();

      expect(result.isDone).toBeTruthy();
      expect(result.autoName).toEqual(
        `${populedSelectState.brand.name} ${
          populedSelectState.model.name} ${
          populedSelectState.year.name}`,
      );
      expect(result.value).toMatch('some-value');
    });
  });

  describe('when dont must show', () => {
    beforeEach(() => {
      useSelectState.mockReturnValue({
        brand: fixtureBrand(),
        model: fixtureModel(),
        year: null,
        value: null,
      });
    });

    it('checks value', () => {
      const result = useShowAutoValue();

      expect(result.isDone).toBeFalsy();
      expect(result.autoName).toBeNull();
      expect(result.value).toBeNull();
    });
  });
});
