import { createContext } from 'react';
import { userDataInterface } from '../interfaces/userDataInterface';

interface isAuthenticatedContextInterface {
  isUserAuthenticated:boolean,
  userState:userDataInterface,
  userLoginHandler: (isLogged:boolean, userData?:userDataInterface)=>void,
}
export const isAuthenticatedContext = createContext<isAuthenticatedContextInterface>({
  isUserAuthenticated: false,
  userState: {
    userEmail: '',
    localId: '',
    idToken: '',
  },
  // userLoginHandler: (isLogged:boolean, userData?:userDataInterface):void => {},
  userLoginHandler: () => {},
});
