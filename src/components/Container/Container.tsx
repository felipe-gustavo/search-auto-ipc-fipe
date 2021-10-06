import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  Container as MuiContainer, makeStyles, Slide,
} from '@material-ui/core';
import useShowAutoValue from '@/hooks/state/useShowAutoValue';
import ShowFipeValue from '../ShowFipeValue';
import FormAuto from '../FormAuto';

const standardTimeTransition = 350;

const useStyles = makeStyles(({ palette }) => ({
  containerForm: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  main: {
    backgroundColor: palette.success.light,
    minWidth: '100vw',
    minHeight: '100vh',
    transition: `background ${standardTimeTransition + 100}ms ease-in-out`,
    '&.showForm': {
      backgroundColor: palette.primary.light,
    },
  },
}));

function Container() {
  const classes = useStyles();
  const { isDone } = useShowAutoValue();
  const [timeTransition, setTimeTransition] = useState(0);
  const [showFipeValue, setShowFipeValue] = useState(false);
  const [showForm, setShowForm] = useState(!isDone);
  const mainClassName = clsx({
    [classes.main]: true,
    showForm,
  });

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setTimeTransition(standardTimeTransition),
      0,
    );
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const [setShow, setHide] = isDone
      ? [setShowFipeValue, setShowForm]
      : [setShowForm, setShowFipeValue];

    setHide(false);
    setTimeout(
      () => setShow(true),
      standardTimeTransition + 100,
    );
  }, [isDone]);

  return (
    <div className={mainClassName}>
      <Slide
        direction="down"
        in={showForm}
        mountOnEnter
        unmountOnExit
        timeout={timeTransition}
      >
        <MuiContainer className={classes.containerForm} maxWidth="sm">
          <FormAuto />
        </MuiContainer>
      </Slide>
      <Slide
        direction="up"
        in={showFipeValue}
        mountOnEnter
        unmountOnExit
        timeout={standardTimeTransition}
      >
        <MuiContainer maxWidth="md">
          <ShowFipeValue />
        </MuiContainer>
      </Slide>
    </div>
  );
}

export default Container;

// export default function Container() {
//   return (
//     <div>
//       <div>
//         <div>
//           <div />
//         </div>
//       </div>
//     </div>
//   );
// }
