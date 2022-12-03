import './NotFoundPage.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const navigateDelay = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => {
      clearTimeout(navigateDelay);
    };
  }, []);
  return (
    <div className="container notfound__container">
      <img src="https://foodorder.networkmanager.pl/img/imgnotfound.svg" alt="errorGraphic" className="notfound__container__image" />
      <p className="notfound__container__information" data-testid="notFoundPageTest">
        Sorry, page not found.
        <br />
        Maybe a typo in the address?
      </p>
    </div>
  );
}
