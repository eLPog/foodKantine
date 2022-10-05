import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAddUser } from '../../../assets/db/firebaseurl';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

export function RegistrationForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userLoginHandler } = useContext(isAuthenticatedContext);
  const loginHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const registerUserFetch = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(firebaseAddUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });
      const res = await data.json();
      if (res.error) {
        setError(res.error.message);
        return;
      }
      userLoginHandler(true, { email: res.email, localId: res.localId, idToken: res.idToken });
      navigate('/');
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
        <button className="btn-primary" onClick={registerUserFetch}>Register</button>
      </form>
      {error && <h3>{error}</h3>}
    </div>
  );
}
