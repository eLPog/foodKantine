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
  // @TODO zmiana maila
  return (
    <div className="container userPage__container">
      <div className="userPage__container__infos">
        <span>{userEmail}</span>
      </div>
      <div className="userPage__container__actions">
        <button className="userPage__container__actions--button">Change email</button>
        <button className="userPage__container__actions--button">Change password</button>
        <button className="userPage__container__actions--button" onClick={passwordReset}>Reset password</button>
        <button className="userPage__container__actions--button">Delete account</button>
      </div>
    </div>
  );
}
