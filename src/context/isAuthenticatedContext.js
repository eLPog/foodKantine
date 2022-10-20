import { createContext } from 'react';

export const isAuthenticatedContext = createContext({
  isUserAuthenticated: false,
  userEmail: '',
  idToken: '',
  localId: '',
  userLoginHandler: () => {},
});
// @TODO usunąć loginHandler z contextu i przekazać jako props do komponentu resetowania hasła, aby wylogować użytkownika po pomyślnym wysłaniu maila
