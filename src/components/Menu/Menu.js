import './Menu.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export function Menu() {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [auth, setAuth] = useAuth();
  const hamburgerMenuHandler = () => {
    showHamburgerMenu ? setShowHamburgerMenu(false) : setShowHamburgerMenu(true);
  };

  const menu = (
    <>
      {auth ? (
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
            <NavLink to="/" onClick={setAuth}>
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
