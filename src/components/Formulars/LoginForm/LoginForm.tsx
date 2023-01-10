import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseLoginWithEmail, firebasePasswordReset } from '../../../assets/db/firebaseurl';
import './LoginForm.css';
import { checkIfRegistrationButtonShouldBeActive } from '../../../utils/checkIfRegistrationButtonShouldBeActive';
import { Loading } from '../../Loading/Loading';
import { loginTestUserFetch } from '../../../utils/loginTestUserFetch';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

export function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { userLoginHandler } = useContext(isAuthenticatedContext);
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
    if (checkIfRegistrationButtonShouldBeActive(email, password)) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [email, password]);

  const loginHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const loginUser = async (e:React.MouseEvent<HTMLButtonElement>) => {
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
      userLoginHandler(true, { userEmail: res.email, localId: res.localId, idToken: res.idToken });
      navigate('/user');
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
  const loginOnTestAccount = useCallback(() => {
    setIsLoading(true);
    (async () => {
      try {
        const res = await loginTestUserFetch();
        userLoginHandler(true, { userEmail: res.email, localId: res.localId, idToken: res.idToken });
        navigate('/user');
      } catch (err) {
        console.log(err);
        navigate('/error');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const eyePasswordHandler = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
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
          {' '}
          <span className="eye" onMouseDown={eyePasswordHandler} onMouseUp={eyePasswordHandler} role="button" tabIndex={0} title="Click and hold down to see the password">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          </span>
        </label>
        <input type={!showPassword ? 'password' : ''} id="loginPassword" required className="login__container__form__input--password" onChange={passwordHandler} />
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
        <span className="--information">
          Only testing?
          <Link to="" onClick={loginOnTestAccount}>
            <span className="--specific"> Test Account </span>
          </Link>
        </span>
      </section>
    </section>
  );
}
