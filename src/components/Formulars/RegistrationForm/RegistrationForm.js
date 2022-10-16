import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAddUser } from '../../../assets/db/firebaseurl';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { setButtonActive } from '../../../utils/setButtonActive';

export function RegistrationForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [btnActive, setBtnActive] = useState(false);
  const { userLoginHandler } = useContext(isAuthenticatedContext);
  const loginHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    if (setButtonActive(email, password)) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [email, password]);
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
    <section className="container register__container">
      <form className="register__container__form">
        Login
        <input type="email" className="register__container__form__input--email" onChange={loginHandler} />
        Password
        <input type="password" className="register__container__form__input--password" onChange={passwordHandler} />
        <button className="btn-primary" onClick={registerUserFetch} disabled={!btnActive}>Register</button>
        {error && <span className="container login__container__form--error">{error}</span>}
      </form>
    </section>
  );
}
