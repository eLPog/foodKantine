import { createContext } from 'react';

export const isAuthenticatedContext = createContext({
  isUserAuthenticated: false,
  userLoginHandler: () => {},
});
