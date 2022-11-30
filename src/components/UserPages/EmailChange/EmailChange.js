import './EmailChange.css';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebaseChangeEmail } from '../../../assets/db/firebaseurl';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { isTestAccount } from '../../../utils/isTestAccount';
import { Loading } from '../../Loading/Loading';

export function EmailChange() {
  const [email, setEmail] = useState('');
  const [emailChangedStatus, setEmailChangedStatus] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestAccountChanged, setIsTestAccountChanged] = useState(false);
  const { userLoginHandler, userState } = useContext(isAuthenticatedContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (email.trim().length > 1 && email.includes('@')) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [email]);
  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const setNewEmail = async () => {
    if (isTestAccount(userState.userEmail)) {
      setIsTestAccountChanged(true);
      setTimeout(() => {
        setIsTestAccountChanged(false);
        navigate('/user');
      }, 5000);
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetch(`${firebaseChangeEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          idToken: userState.idToken,
        }),
      });
      if (data.status === 200) {
        setEmailChangedStatus(true);
        setTimeout(() => {
          navigate('/login');
        }, 5000);
        setIsLoading(false);
      } else {
        navigate('/error');
      }
      userLoginHandler(true, {email: res.email, localId: res.localId, idToken: res.idToken});
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
      {isLoading ? <Loading /> : emailChangedStatus ? emailSuccessfulChanged : (
        <>
          <label htmlFor="inputChangeEmail">
            Enter new email
          </label>
          <input onChange={emailInputHandler} type="email" className="emailChange__container__input" />
          <button className="btn-primary" onClick={setNewEmail} disabled={!isButtonActive}>Save</button>
          <Link to="/user">
            <button className="btn-primary">Cancel</button>
          </Link>
        </>
      )}
      {isTestAccountChanged && (
      <span className="testAccountInfo--error">
        <p>Im sorry. You cannot make this changes on test account.</p>
        <p> If you want to check this functionality please create a own account.</p>
      </span>
      )}
    </div>
  );
}
