import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedContext } from '../context/isAuthenticatedContext';

export function useAuth() {
  const authContext = useContext(isAuthenticatedContext);
  const navigate = useNavigate();
  const auth = authContext.isUserAuthenticated;
  const setAuth = (isAuthenticated, userData = null) => {
    if (!isAuthenticated) { // nie ma argumentu lub false to wyloguj
      authContext.userLoginHandler();
      navigate('/');
    } else { // jest argument/true to zaloguj i zapisz token do localstorage
      authContext.userLoginHandler();
      localStorage.setItem('token-data', JSON.stringify(userData.idToken));
      authContext.userDataHandler(userData);
      navigate('/');
    }
  };
  return [auth, setAuth];
}
