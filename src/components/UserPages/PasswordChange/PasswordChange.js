import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export function PasswordChange(props) {
  useEffect(() => {
    props.userLoginHandler(false);
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
        <NavLink to="/">
          <button className="btn-primary">Main Page</button>
        </NavLink>
      </section>
    </div>
  );
}
