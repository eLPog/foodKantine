import { createContext } from 'react';

export const isAuthenticatedContext = createContext({
  isUserAuthenticated: false,
  userEmail: '',
  idToken: '',
  localId: '',
});
