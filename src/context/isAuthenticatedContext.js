import { createContext } from 'react';

export const isAuthenticatedContext = createContext({
  isAuthenticated: false,
});
