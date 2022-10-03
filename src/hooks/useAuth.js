import { useContext } from 'react';
import { isAuthenticatedContext } from '../context/isAuthenticatedContext';

export function useAuth() {
  const authContext = useContext(isAuthenticatedContext);
  const auth = authContext.isUserAuthenticated;
  const setAuth = () => {
    authContext.userLoginHandler();
  };
  return [auth, setAuth];
}
