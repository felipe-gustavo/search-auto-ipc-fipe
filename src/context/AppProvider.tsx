import { useReducer, ReactNode } from 'react';
import AppContext from './AppContext';
import reducer, { initialState } from './reducer';

type AppProviderProps = {
  children: ReactNode
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
