import React from 'react';
import './ErrorPage.css';
import { NavLink } from 'react-router-dom';

export const ErrorPage = React.memo(() => (
  <div className="container text-center mt-5">
    <section>
      <p>We have some Error. Please try again.</p>
      <br />
      <NavLink to="/">
        <button className="btn-primary">Main Page</button>
      </NavLink>
    </section>
  </div>
));
