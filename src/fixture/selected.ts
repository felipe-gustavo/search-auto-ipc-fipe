import type AppState from '@/types/AppState';
import fixtureBrand from './brand';
import fixtureModel from './model';
import fixtureValue from './value';
import fixtureYear from './year';

export default function fixtureSelected(
  selected: {
    [K in keyof AppState['selectedAuto']]?: AppState['selectedAuto'][K]
  },
): AppState['selectedAuto'] {
  return {
    brand: fixtureBrand(),
    model: fixtureModel(),
    year: fixtureYear(),
    value: fixtureValue(),
    ...selected,
  };
}
