import { useEffect } from 'react';
import {
  Box, Grid, makeStyles, Paper,
} from '@material-ui/core';
import useFetchBrands from '@/hooks/useFetchBrands';
import Header from '../Header';
import Loading from '../LoadingBackdrop';
import SelectYear from '../SelectYear';
import SelectBrand from '../SelectBrand';
import SelectModel from '../SelectModel';
import ButtonSearch from '../ButtonSearch';

const useStyles = makeStyles(({ spacing }) => ({
  containerForm: {
    padding: `${spacing(5)}px ${spacing(8)}px`,
    backgroundColor: '#FFF',
    borderRadius: '5px',
    width: '100%',
  },
}));

function FormAuto() {
  const classes = useStyles();
  const fetchBrands = useFetchBrands();

  useEffect(() => {
    fetchBrands();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box margin="auto 0" height="100%" width="100%">
      <Header />
      <Loading>
        <Paper className={classes.containerForm} elevation={2}>
          <Grid container spacing={3}>
            <SelectBrand />
            <SelectModel />
            <SelectYear />
            <ButtonSearch />
          </Grid>
        </Paper>
      </Loading>
    </Box>
  );
}

export default FormAuto;
