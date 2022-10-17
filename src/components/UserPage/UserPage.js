import './UserPage.css';
import { useContext } from 'react';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext';
import { firebasePasswordReset } from '../../assets/db/firebaseurl';

export function UserPage() {
  const { userEmail } = useContext(isAuthenticatedContext);
  const passwordReset = async () => {
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
      const data = await res.json();
      console.log(data);
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
        <p>Change email</p>
        <p>Change password</p>
        <button onClick={passwordReset}>Reset password</button>
        <p>Delete account</p>
      </div>
    </div>
  );
}
