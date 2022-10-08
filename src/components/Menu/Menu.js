import './Menu.css';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext';

export function Menu(props) {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [newProductInCart, setNewProductInCart] = useState(false);
  const { isUserAuthenticated, userLoginHandler, userEmail } = useContext(isAuthenticatedContext);
  const hamburgerMenuHandler = () => {
    showHamburgerMenu ? setShowHamburgerMenu(false) : setShowHamburgerMenu(true);
  };
  useEffect(() => {
    if (props.numbersOfItemsInOrdersCart === 0) return;
    setNewProductInCart(true);
    const timer = setTimeout(() => {
      setNewProductInCart(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [props.numbersOfItemsInOrdersCart]);

  const menu = (
    <>
      {isUserAuthenticated ? (
        <>
          <li title="Shop card">
            <NavLink to="/order" className={newProductInCart ? 'itemAddedToCartAnimation' : ''}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart4"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                />
              </svg>
              {props.numbersOfItemsInOrdersCart}
            </NavLink>
          </li>
          <li title="User account">
            <NavLink to="/signIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                />
              </svg>
            </NavLink>
          </li>
          <li title="Orders stats">
            <NavLink to="/signIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clipboard2-data"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"
                />
                <path
                  d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"
                />
                <path
                  d="M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1Z"
                />
              </svg>
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
