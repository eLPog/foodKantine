import React from 'react';
import './ErrorPage.css';
import { NavLink } from 'react-router-dom';

export const ErrorPage: React.MemoExoticComponent<() => JSX.Element> = React.memo(() => (
  <div className="container errorPage__container" data-testid="errorPageContainer">
    <img src="https://foodorder.networkmanager.pl/img/imgerror.svg" alt="errorGraphic" className="errorPage__container__image" />
    <p className="errorPage__container__information">
      Uuppss...We have some Error.
      <br />
      Please try again.
    </p>
    <NavLink to="/">
      <button className="btn-primary">Main Page</button>
    </NavLink>
  </div>
));
