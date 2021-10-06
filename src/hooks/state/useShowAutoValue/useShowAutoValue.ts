import _ from 'lodash';
import useSelectState from '../useSelectState';

function useShowAutoValue() {
  const selectedAuto = useSelectState();
  const {
    brand, model, year, value,
  } = selectedAuto;

  const isDone = !Object.values(selectedAuto).includes(null);
  const autoName = isDone
    ? [brand, model, year].map(_.curry(_.get)(_, 'name')).join(' ').trim()
    : null;

  return { isDone, autoName, value };
}

export default useShowAutoValue;
