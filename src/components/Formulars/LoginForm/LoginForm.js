import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseLoginWithEmail, firebasePasswordReset } from '../../../assets/db/firebaseurl';
import './LoginForm.css';
import { setButtonActive } from '../../../utils/setButtonActive';
import { Loading } from '../../Loading/Loading';

export function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [btnActive, setBtnActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userLoginHandler } = props;
  useEffect(() => {
    if (error) {
      const timeAction = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timeAction);
    }
  }, [error]);
  useEffect(() => {
    setError('');
  }, [email, password]);
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
  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
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
      setIsLoading(false);
      if (res.error) {
        setError('Invalid email or password');
        return;
      }
      userLoginHandler(true, { email: res.email, localId: res.localId, idToken: res.idToken });
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      navigate('/error');
    }
  };
  const passwordReset = async () => {
    if (email.trim().length < 5 || !email.includes('@')) {
      setError('Provide valid email format');
      return;
    }
    setIsLoading(true);
    try {
      await fetch(firebasePasswordReset, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email,
        }),
      });
      setIsLoading(false);
      navigate('/user/passwordReset');
    } catch (err) {
      console.log(err);
      navigate('/error');
    }
  };
  return (
    <section className="container login__container">
      <h2 className="container login__container__title">Login</h2>
      <form className="login__container__form">
        <label htmlFor="loginEmail">
          Email
        </label>
        <input type="email" id="loginEmail" required className="login__container__form__input--email" onChange={loginHandler} />
        <label htmlFor="loginPassword">
          Password
        </label>
        <input type="password" id="loginPassword" required className="login__container__form__input--password" onChange={passwordHandler} />
        <button className="btn-primary" disabled={!btnActive} onClick={loginUser}>Login</button>
        {isLoading && <Loading />}
        {error && <span className="container login__container__form--error">{error}</span>}

      </form>
      <section className="login__container__options">
        <span className="--information">
          New user?
          <Link to="/signIn">
            <span className="--specific"> Sign In</span>
          </Link>
        </span>
        <span className="--information">
          Password forgot?
          <Link to="" onClick={passwordReset}>
            <span className="--specific"> Reset </span>
          </Link>
        </span>
      </section>
    </section>
  );
}
