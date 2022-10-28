import './UserPage.css';
import { useCallback, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { firebaseDeleteAccount, firebasePasswordReset } from '../../../assets/db/firebaseurl';

export function UserPage() {
  const { userEmail, idToken } = useContext(isAuthenticatedContext);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const navigate = useNavigate();

  const setNewPassword = async () => {
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
    isDeleteConfirmed ? setIsDeleteConfirmed(false) : setIsDeleteConfirmed(true);
  }, [isDeleteConfirmed]);

  const deleteAccount = async () => {
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
      <div className="userPage__container__infos">
        <span>{userEmail}</span>
      </div>
      <div className="userPage__container__actions">
        <NavLink to="/user/emailChange">
          <button className="userPage__container__actions--button">Change email</button>
        </NavLink>
        <button className="userPage__container__actions--button" onClick={setNewPassword}>Change password</button>
        <button className="userPage__container__actions--button" onClick={isDeleteConfirmedHandler}>Delete account</button>
        {isDeleteConfirmed && (
        <>
          <p>Do You really want to delete Your account?</p>
          <button className="btn-primary userPage__container__actions--confirm" onClick={deleteAccount}>Delete</button>
          <button className="btn-primary userPage__container__actions--cancel" onClick={isDeleteConfirmedHandler}>Cancel</button>
        </>
        )}
      </div>
    </div>
  );
}
