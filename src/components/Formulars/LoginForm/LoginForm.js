import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseLoginWithEmail } from '../../../assets/db/firebaseurl';
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
        setTimeout(() => {
          setError('');
        }, 5000);
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
        <button className="btn-primary" disabled={!btnActive} onClick={fetchLogin}>Login</button>
        {isLoading && <Loading />}
        {error && <span className="container login__container__form--error">{error}</span>}
        <span className="--information">
          You dont have an account yet? Create them
          <Link to="/signIn">
            <span className="--specific"> here.</span>
          </Link>
        </span>
      </form>
    </section>
  );
}
