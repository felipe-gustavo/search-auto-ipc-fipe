import { Grid, makeStyles } from '@material-ui/core';
import useSelectModel from '@/hooks/useSelectModel';
import { useAutoState, useLoadingState, useSelectState } from '@/hooks/state';
import Select from '../Select';

const useStyles = makeStyles({
  containerSelect: {
    display: 'flex',
    justifyContent: 'center',
  },
});

function SelectModel() {
  const classes = useStyles();
  const { models } = useAutoState();
  const { model } = useSelectState();
  const selectModel = useSelectModel();
  const { field } = useLoadingState();

  const handleChange = (selected: typeof model) => {
    selectModel(selected);
  };

  return (
    <Grid item xs={12} className={classes.containerSelect}>
      <Select
        inputLabel="Modelo"
        selected={model}
        options={models || []}
        visualOptionName="name"
        onChange={handleChange}
        disabled={models === undefined}
        isLoading={field.model}
      />
    </Grid>
  );
}

export default SelectModel;
