import _ from 'lodash';
import { createTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const standardTheme = createTheme();

const theme = _.merge(
  standardTheme,
  createTheme({
    typography: {
      h4: {
        fontWeight: 'bolder',
      },
    },
    palette: {
      primary: {
        ...deepPurple,
        300: '#f9f6fc',
      },
      success: {
        light: '#dcf5f2',
        main: '#00a38c',
      },
    },
  }),
);

export default theme;
