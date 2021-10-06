import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useAlertState } from '@/hooks/state';

function AlertMessage() {
  const alert = useAlertState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (alert) {
      enqueueSnackbar(alert.message, {
        variant: alert.type,
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
        action: (key) => (
          <Button
            variant="text"
            size="small"
            onClick={() => closeSnackbar(key)}
          >
            fechar
          </Button>
        ),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  return <></>;
}

export default AlertMessage;
