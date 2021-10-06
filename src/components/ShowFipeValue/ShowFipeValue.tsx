/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useShowAutoValue from '@/hooks/state/useShowAutoValue';
import useAppActions from '@/hooks/useAppActions';

const useStyles = makeStyles(({ spacing, palette }) => ({
  containerFipeValue: {
    textAlign: 'center',
    padding: `${spacing(8)}px 0px`,
    display: 'grid',
    gridRowGap: '22px',
  },
  valueLabel: {
    color: 'white',
    padding: '8px 24px',
    borderRadius: '36px',
    backgroundColor: palette.success.main,
  },
}));

function ShowFipeValue() {
  const classes = useStyles();
  const autoValues = useShowAutoValue();
  const [{ autoName, value }, setDelayValues] = useState(autoValues);
  const { resetState } = useAppActions();

  useEffect(() => {
    if (autoValues.isDone) {
      setDelayValues(autoValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoValues.isDone]);

  const handleReset = () => {
    resetState();
  };

  return (
    <div className={classes.containerFipeValue}>
      <div>
        <Typography variant="h4">
          Tabela Fipe:
          {' '}
          {autoName}
        </Typography>
      </div>
      <div>
        <Typography component="span" className={classes.valueLabel} variant="h4">
          {value}
        </Typography>
      </div>
      <div>
        <Typography component="div" variant="subtitle2">
          Este é o preço de compra do veículo
        </Typography>
        <Link
          data-testid="linkReset"
          onClick={handleReset}
          component="button"
          variant="body2"
        >
          Escolher outro veículo
        </Link>
      </div>
    </div>
  );
}

export default ShowFipeValue;
