import { useContext } from 'react';
import AppContext from '@/context';

function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Use `useContext` inside `AppProvider`');
  }

  return context;
}

export default useAppContext;
