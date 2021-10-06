import { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { useLoadingState } from '@/hooks/state';

const useStyles = makeStyles({
  fieldSet: {
    position: 'relative',
    border: 'none',
    padding: 0,
    margin: 0,
    paddingInline: 0,
    paddingBlock: 0,
    marginInline: 0,
    minInlineSize: 0,
    '*': 'inherit',
  },
  loadingContainer: {
    zIndex: 999999,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'E1E1E1',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    display: (isLoading) => (isLoading ? 'flex' : 'none'),
  },
});

function LoadingBackdrop({ children }: PropsWithChildren<{}>) {
  const { all: isLoading } = useLoadingState();
  const classes = useStyles(isLoading);

  return (
    <fieldset data-testid="fieldset" className={classes.fieldSet} disabled={isLoading}>
      <div data-testid="containerLoading" className={classes.loadingContainer} hidden={isLoading}>
        <CircularProgress color="primary" />
      </div>
      <div>
        {children}
      </div>
    </fieldset>
  );
}

export default LoadingBackdrop;
