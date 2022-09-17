import './Header.js.css';
import { useEffect, useRef, useState } from 'react';

export function Header(props) {
  const [term, setTerm] = useState('');
  const inputRef = useRef();

  const searchHandler = () => {
    props.searchDish(term);
  };
  const onInputHandler = (e) => {
    setTerm(e.target.value);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };
  useEffect(() => {
    focusInput();
  }, []);

  return (
    <header>
      <div className="container header__container">
        <input
          ref={inputRef}
          type="text"
          onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
          onChange={onInputHandler}
          placeholder="Search..."
          className="header__container__input"
          value={term}
        />
        <button
          onClick={searchHandler}
          className="btn-primary header__container--searchBtn"
        >
          {' '}
          Search
        </button>
      </div>
    </header>
  );
}
