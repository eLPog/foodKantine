import { useEffect } from 'react';

export function DeleteAccountSummary(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.userLoginHandler(false);
      return () => clearTimeout(timer);
    }, 5000);
  }, []);
  return (
    <section className="container text-center mt-5">
      <p>Account successfully deleted</p>
      <p>Thank You for using my app</p>
    </section>
  );
}
