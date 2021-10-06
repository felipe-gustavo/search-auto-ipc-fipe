import type AppState from '@/types/AppState';
import fixtureBrand from './brand';
import fixtureModel from './model';
import fixtureYear from './year';

export default function fixtureAuto(
  selected: {
    [K in keyof AppState['auto']]?: AppState['auto'][K]
  },
): AppState['auto'] {
  return {
    brands: [fixtureBrand()],
    models: [fixtureModel()],
    years: [fixtureYear()],
    ...selected,
  };
}
