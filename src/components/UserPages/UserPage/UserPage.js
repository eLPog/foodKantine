import './UserPage.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { firebasePasswordReset } from '../../../assets/db/firebaseurl';

export function UserPage() {
  const navigate = useNavigate();
  const { userEmail } = useContext(isAuthenticatedContext);
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
        navigate('/user/setNewPassword');
      } else {
        navigate('/error');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container userPage__container">
      <div className="userPage__container__infos">
        <span>{userEmail}</span>
      </div>
      <div className="userPage__container__actions">
        <button className="userPage__container__actions--button">Change email</button>
        <button className="userPage__container__actions--button" onClick={setNewPassword}>Change password</button>
        <button className="userPage__container__actions--button">Delete account</button>
      </div>
    </div>
  );
}
