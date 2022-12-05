import { useContext, useEffect } from 'react';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

export function PasswordChange() {
  const { userLoginHandler } = useContext(isAuthenticatedContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      userLoginHandler(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container text-center mt-5">
      <section>
        <p>
          We will send You email with a link to set the new password.
        </p>
        <p>
          If you have not received email, please check spam folder.
        </p>
        <p>
          You will move to Main Page in a second
        </p>
      </section>
    </div>
  );
}
