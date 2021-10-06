export function fixtureAutoValueComplete() {
  return {
    isDone: true,
    autoName: 'some-name',
    value: 'some-value',
  };
}

export function fixtureAutoValueIncomplete() {
  return {
    isDone: false,
    autoName: null,
    value: null,
  };
}
