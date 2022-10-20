import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAddUser } from '../../../assets/db/firebaseurl';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { setButtonActive } from '../../../utils/setButtonActive';
import './RegistrationForm.css';

export function RegistrationForm(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');
  const [btnActive, setBtnActive] = useState(false);
  const { userLoginHandler } = props;
  const loginHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmedPasswordHandler = (e) => {
    setConfirmedPassword(e.target.value);
  };
  useEffect(() => {
    const arePasswordsTheSame = setTimeout(() => {
      password !== confirmedPassword ? setError('Passwords are different') : setError('');
    }, 1000);
    return () => clearTimeout(arePasswordsTheSame);
  }, [password, confirmedPassword]);
  useEffect(() => {
    if (setButtonActive(email, password) && password === confirmedPassword) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [email, password, confirmedPassword]);
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
      userLoginHandler(true, { email: res.email, localId: res.localId, idToken: res.idToken });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="container register__container">
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
          Confirm Password
        </label>
        <input type="password" id="registerPassword2" className="register__container__form__input--password" onChange={confirmedPasswordHandler} />
        <button className="btn-primary" onClick={registerUserFetch} disabled={!btnActive}>Register</button>
        {error && <span className="container login__container__form--error">{error}</span>}
      </form>
    </section>
  );
}
