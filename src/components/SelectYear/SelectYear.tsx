import { Collapse, Grid, makeStyles } from '@material-ui/core';
import { useAutoState, useLoadingState, useSelectState } from '@/hooks/state';
import useAppActions from '@/hooks/useAppActions';
import Select from '../Select';

const useStyles = makeStyles({
  gridComponent: {
    transition: 'padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&[aria-hidden="true"]': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
});

function SelectYear() {
  const { years } = useAutoState();
  const { model, year } = useSelectState();
  const { setSelected } = useAppActions();
  const classes = useStyles();
  const { field } = useLoadingState();

  const handleChange = (selected: typeof year) => {
    setSelected('year', selected);
    if (!selected) {
      setSelected('value', null);
    }
  };

  return (
    <Grid item xs={12} className={classes.gridComponent} aria-hidden={!model}>
      <div>
        <Collapse in={!!model}>
          <Select
            selected={year}
            inputLabel="Ano"
            options={years || []}
            visualOptionName="name"
            disabled={years === undefined}
            onChange={handleChange}
            isLoading={field.year}
          />
        </Collapse>
      </div>
    </Grid>
  );
}

export default SelectYear;
