import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseLoginWithEmail } from '../../../assets/db/firebaseurl';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import './LoginForm.css';
import { setButtonActive } from '../../../utils/setButtonActive';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [btnActive, setBtnActive] = useState(false);
  const navigate = useNavigate();
  const { userLoginHandler } = useContext(isAuthenticatedContext);
  useEffect(() => {
    if (setButtonActive(email, password)) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [email, password]);
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
      console.log(res);
      if (res.error) {
        setError('Invalid email or password');
        return;
      }
      userLoginHandler(true, { email: res.email, localId: res.localId, idToken: res.idToken });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="container login__container">
      <form className="login__container__form">
        <label htmlFor="loginEmail">
          Email
        </label>
        <input type="email" id="loginEmail" required className="login__container__form__input--email" onChange={loginHandler} />
        <label htmlFor="loginPassword">
          Password
        </label>
        <input type="password" id="loginPassword" required className="login__container__form__input--password" onChange={passwordHandler} />
        <button className="btn-primary" disabled={!btnActive} onClick={fetchLogin}>Login</button>
        {error && <span className="container login__container__form--error">{error}</span>}
      </form>
    </section>
  );
}
