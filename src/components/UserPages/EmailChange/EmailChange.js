import './EmailChange.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseChangeEmail } from '../../../assets/db/firebaseurl';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

export function EmailChange(props) {
  const [email, setEmail] = useState('');
  const [emailChangedStatus, setEmailChangedStatus] = useState(false);
  const { idToken } = useContext(isAuthenticatedContext);
  const navigate = useNavigate();
  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const setNewEmail = async () => {
    try {
      const data = await fetch(`${firebaseChangeEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          idToken,
        }),
      });
      if (data.status === 200) {
        setEmailChangedStatus(true);
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        navigate('/error');
      }
      props.userLoginHandler(false);
    } catch (err) {
      console.log(err);
      navigate('/error');
    }
  };
  const emailSuccessfulChanged = (
    <>
      <p>Successful email change</p>
      <p>
        Your new email:
        {email}
      </p>
      <p>You will be redirected to the login page. Please log in to the new email again</p>
    </>
  );
  return (
    <div className="container text-center emailChange__container">
      {emailChangedStatus ? emailSuccessfulChanged : (
        <>
          <label htmlFor="inputChangeEmail">
            Your new email
          </label>
          <input onChange={emailInputHandler} type="email" className="emailChange__container__input" />
          <button className="btn-primary" onClick={setNewEmail}>Save</button>
        </>
      )}
    </div>
  );
}
