import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseAddUser } from '../../../assets/db/firebaseurl';
import { checkIfRegistrationButtonShouldBeActive } from '../../../utils/checkIfRegistrationButtonShouldBeActive';
import './RegistrationForm.css';
import { Loading } from '../../Loading/Loading';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { RegisterProgress } from '../../elements/RegisterProgress/RegisterProgress';
import { routes } from '../../../routes/routes';

export function RegistrationForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userLoginHandler } = useContext(isAuthenticatedContext);
  const loginHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const confirmedPasswordHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(e.target.value);
  };
  useEffect(() => {
    const arePasswordsTheSame = setTimeout(() => {
      password !== confirmedPassword ? setError('Passwords are different') : setError('');
    }, 1000);
    return () => clearTimeout(arePasswordsTheSame);
  }, [password, confirmedPassword]);
  useEffect(() => {
    if (checkIfRegistrationButtonShouldBeActive(email, password) && password === confirmedPassword) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [email, password, confirmedPassword]);
  const registerUserFetch = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
      if (res.error) {
        if (res.error.message.includes('WEAK_PASSWORD')) {
          setError('Password should be at least 6 characters');
          return;
        }
        if (res.error.message.includes('EMAIL_EXIST')) {
          setError('Email already exist');
          return;
        }
        if (res.error) {
          setError('Unexpected error. Pleas try again.');
          return;
        }
      }
      userLoginHandler(true, { userEmail: res.email, localId: res.localId, idToken: res.idToken });
      navigate(routes.user);
    } catch (err) {
      console.log(err);
      navigate(routes.errorPage);
    }
  };
  return (
    <section className="container register__container">
      <h2 className="container register__container__title">Register as new user</h2>

      <form className="register__container__form">
        <label htmlFor="registerEmail">
          Email
        </label>
        <input type="email" id="registerEmail" className="register__container__form__input--email" onChange={loginHandler} />
        <label htmlFor="registerPassword1">
          Password
        </label>
        <input type="password" id="registerPassword1" className="register__container__form__input--password" onChange={passwordHandler} />
        <label htmlFor="registerPassword2">
          Confirm password
        </label>
        <input type="password" id="registerPassword2" className="register__container__form__input--password" onChange={confirmedPasswordHandler} />
        Please note that the password should be at least 6 characters long
        <button className="btn-primary" onClick={registerUserFetch} disabled={!btnActive}>Register</button>
      </form>
      <RegisterProgress email={email} password1={password} password2={confirmedPassword} isButtonActive={btnActive} />
      {isLoading && <Loading />}
      {error && <span className="container login__container__form--error">{error}</span>}
      <span className="--information">
        Already have an account? Just
        <Link to="/login">
          <span className="--specific">log in.</span>
        </Link>
      </span>
    </section>
  );
}
