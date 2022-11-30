import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

export function PasswordChange() {
  const { userLoginHandler } = useContext(isAuthenticatedContext);

  useEffect(() => {
    userLoginHandler(true, {email: res.email, localId: res.localId, idToken: res.idToken});
  }, []);
  return (
    <div className="container text-center mt-5">
      <section>
        <p>
          An email was sent with a link to reset the password.
        </p>
        <p>
          If you havent received your email please check spam
        </p>
        <NavLink to="/login">
          <button className="btn-primary">Login</button>
        </NavLink>
      </section>
    </div>
  );
}
