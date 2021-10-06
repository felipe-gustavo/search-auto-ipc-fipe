import type AlertMessage from './AlertMessage';
import type Year from './Year';
import type Brand from './Brand';
import type Model from './Model';
import type Loading from './Loading';

interface AppState {
  auto: {
    brands: Array<Brand>,
    models: undefined | Array<Model>,
    years: undefined | Array<Year>,
  },
  selectedAuto: {
    brand: Brand | null,
    model: Model | null,
    year: Year | null,
    value: string | null,
  },
  alert: AlertMessage | undefined,
  isLoading: Loading,
}

export default AppState;
