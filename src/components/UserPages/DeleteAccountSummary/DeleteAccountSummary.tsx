import { useContext, useEffect } from 'react';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

export function DeleteAccountSummary() {
  const { userLoginHandler } = useContext(isAuthenticatedContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      userLoginHandler(false);
      return () => clearTimeout(timer);
    }, 5000);
  }, []);
  return (
    <>
      <section className="container text-center mt-5">
        <p>Account successfully deleted</p>
        <p>Thank You for using my app</p>
      </section>
    </>
  );
}
