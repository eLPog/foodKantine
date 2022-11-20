import { createContext } from 'react';

export const isAuthenticatedContext = createContext({
  isUserAuthenticated: false,
  userState: {
    userEmail: '',
    localId: '',
    idToken: '',
  },
  userLoginHandler: () => {},
});
