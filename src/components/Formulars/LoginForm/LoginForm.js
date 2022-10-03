import { useContext, useState } from 'react';
import { firebaseLoginWithEmail } from '../../../assets/db/firebaseurl';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { useAuth } from '../../../hooks/useAuth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const loginHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const fetchLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(firebaseLoginWithEmail, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });
      const res = await data.json();
      if (res.error) {
        return;
      }
      setAuth();
      localStorage.setItem('token-data', JSON.stringify(res.idToken));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <form>
        Login :
        {' '}
        <input type="text" onChange={loginHandler} />
        Password:
        <input type="password" onChange={passwordHandler} />
        <button className="btn-primary" onClick={fetchLogin}>Login</button>
      </form>
    </div>
  );
}
