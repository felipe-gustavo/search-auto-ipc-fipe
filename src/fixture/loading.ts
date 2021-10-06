import type Loading from '@/types/Loading';

export function fixtureLoadingAll(value: boolean): Loading {
  return {
    all: value,
    field: {
      brand: false,
      model: false,
      year: false,
    },
  };
}

export function fixtureLoadingAField(field: keyof Loading['field'], value: boolean): Loading {
  return {
    all: false,
    field: {
      brand: false,
      model: false,
      year: false,
      [field]: value,
    },
  };
}
