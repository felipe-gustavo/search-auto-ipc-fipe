import { createContext } from 'react';
import type AppDispatch from '@/types/AppDispatch';
import type AppState from '@/types/AppState';

const AppContext = createContext<{
  state: AppState,
  dispatch: AppDispatch,
} | undefined>(undefined);

export default AppContext;
