import './UserPage.css';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { firebaseDeleteAccount, firebasePasswordReset } from '../../../assets/db/firebaseurl';
import { isTestAccount } from '../../../utils/isTestAccount';
import { Loading } from '../../Loading/Loading';

export function UserPage() {
  const { userEmail, idToken } = useContext(isAuthenticatedContext);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isTestAccountChanged, setIsTestAccountChanged] = useState(false);
  const [showTestAccountInfo, setShowTestAccountInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail === 'test@test.com') {
      setShowTestAccountInfo(true);
    }
  }, [userEmail]);

  const setNewPassword = async () => {
    if (isTestAccount(userEmail)) {
      setIsTestAccountChanged(true);
      setTimeout(() => {
        setIsTestAccountChanged(false);
      }, 5000);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(firebasePasswordReset, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: userEmail,
        }),
      });
      setIsLoading(false);
      if (res.ok) {
        navigate('/user/passwordReset');
      } else {
        navigate('/error');
      }
    } catch (err) {
      console.log(err);
      navigate('/error');
    }
  };

  const isDeleteConfirmedHandler = useCallback(() => {
    if (isTestAccount(userEmail)) {
      setIsTestAccountChanged(true);
      setTimeout(() => {
        setIsTestAccountChanged(false);
      }, 5000);
      return;
    }
    isDeleteConfirmed ? setIsDeleteConfirmed(false) : setIsDeleteConfirmed(true);
  }, [isDeleteConfirmed]);

  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(firebaseDeleteAccount, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          idToken,
        }),
      });
      setIsLoading(false);
      if (res.ok) {
        localStorage.removeItem('user-data');
        navigate('/user/delete');
      } else {
        navigate('/error');
      }
    } catch (err) {
      console.log(err);
      navigate('/error');
    }
  };
  return (
    <div className="container userPage__container">
      {isLoading && <Loading />}
      {showTestAccountInfo && <p className="userPage__container__testAccountInfo">Because you are logged into a test account, account editing functions are blocked.</p>}
      <div className="userPage__container__infos">
        <span className="--information">
          You are logged as:
          <span className="--specific">
            {userEmail}
          </span>
        </span>
      </div>
      <div className="userPage__container__actions">
        <NavLink to="/user/emailChange" className="userPage__container__actions--button">
          Change email
        </NavLink>
        <button className="userPage__container__actions--button" onClick={setNewPassword}>Change password</button>
        <button className="userPage__container__actions--button" onClick={isDeleteConfirmedHandler}>Delete account</button>
        {isDeleteConfirmed && (
        <>
          <p>Do You really want to delete Your account?</p>
          <button className="btn-primary userPage__container__actions--confirmDELETE" onClick={deleteAccount}>Delete</button>
          <button className="btn-primary userPage__container__actions--cancel" onClick={isDeleteConfirmedHandler}>Cancel</button>
        </>
        )}
        {isTestAccountChanged && (
        <div className="testAccountError">
          <p>Im sorry. You cannot make this changes on test account.</p>
          <p> If you want to check this functionality please create a own account.</p>
        </div>
        )}
      </div>
    </div>
  );
}
