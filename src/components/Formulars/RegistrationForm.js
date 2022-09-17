import { useState } from 'react';
import { firebaseAddUser, firebaseURL } from '../../assets/db/firebaseurl';
import { db } from '../../assets/db/db';

export function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const fetchLogin = async (e) => {
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
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const loadData = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${firebaseURL}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(db),
      });
      const res = await data.json();
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
      <form>
        <button className="btn-primary" onClick={loadData}>Wgraj dane</button>
      </form>
    </div>
  );
}
