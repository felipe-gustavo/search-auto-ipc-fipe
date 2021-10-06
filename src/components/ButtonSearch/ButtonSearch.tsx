import { Button, Grid, makeStyles } from '@material-ui/core';
import { omit } from 'lodash';
import { useSelectState } from '@/hooks/state';
import useSearchAuto from '@/hooks/useSearchAuto';

const useStyles = makeStyles((theme) => ({
  conatinerButton: {
    padding: `${theme.spacing(3)}px 0`,
    display: 'flex',
    justifyContent: 'center',
  },
}));

function ButtonSearch() {
  const selectedAuto = useSelectState();
  const classes = useStyles();
  const enableToSearch = !Object.values(omit(selectedAuto, ['value'])).includes(null);
  const searchAuto = useSearchAuto();

  return (
    <Grid item xs={12} className={classes.conatinerButton}>
      <Button
        data-testid="button-search"
        size="large"
        color="primary"
        variant="contained"
        onClick={searchAuto}
        disabled={!enableToSearch}
      >
        Consultar Preço
      </Button>
    </Grid>
  );
}

export default ButtonSearch;
