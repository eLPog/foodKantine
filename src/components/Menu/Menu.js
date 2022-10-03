import './Menu.css';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext';

export function Menu() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const { isUserAuthenticated, userLoginHandler, userEmail } = useContext(isAuthenticatedContext);
  const hamburgerMenuHandler = () => {
    showHamburgerMenu ? setShowHamburgerMenu(false) : setShowHamburgerMenu(true);
  };

  const menu = (
    <>
      {isUserAuthenticated ? (
        <>
          {' '}
          <li>
            <NavLink to="/signIn">
              Delete Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/signIn">
              History
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={() => userLoginHandler(false)}>
              Logout
            </NavLink>
          </li>
        </>
      ) : (
        <>
          {' '}
          <li>
            <NavLink to="/signIn">
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              Login
            </NavLink>
          </li>
        </>
      )}

    </>
  );

  return (
    <nav className="nav__container container">
      <div className="nav__container__logo">
        <NavLink to="/">
          <h1>Food Kantine</h1>
          <h2>{userEmail}</h2>
        </NavLink>
      </div>
      <button className="toggle--button" onClick={hamburgerMenuHandler}>
        <div className="toggle--button--bar">{showHamburgerMenu ? 'X' : 'Menu'}</div>
      </button>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className="nav__container__menu"
        onClick={hamburgerMenuHandler}
        role="button"
        tabIndex={0}
      >
        <ul className={`nav__container__menu__list ${showHamburgerMenu ? 'active' : 'hide'}`}>
          {menu}
        </ul>
      </div>
    </nav>

  );
}
