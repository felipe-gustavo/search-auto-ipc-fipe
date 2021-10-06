import { Grid, makeStyles } from '@material-ui/core';
import { useAutoState, useLoadingState, useSelectState } from '@/hooks/state';
import useSelectBrand from '@/hooks/useSelectBrand';
import Select from '../Select';

const useStyles = makeStyles({
  containerSelect: {
    display: 'flex',
    justifyContent: 'center',
  },
});

function SelectBrand() {
  const classes = useStyles();
  const selectBrand = useSelectBrand();
  const { brands } = useAutoState();
  const { brand } = useSelectState();
  const { field } = useLoadingState();

  const handleSelect = (selected: typeof brand) => {
    selectBrand(selected);
  };

  return (
    <Grid item xs={12} className={classes.containerSelect}>
      <Select
        inputLabel="Marca"
        selected={brand}
        options={brands}
        visualOptionName="name"
        onChange={handleSelect}
        isLoading={field.brand}
      />
    </Grid>
  );
}

export default SelectBrand;
