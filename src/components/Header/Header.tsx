import './Header.js.css';
import React, { useEffect, useRef, useState } from 'react';

export function Header(props:{searchDish:(value:string)=>void}) {
  const [term, setTerm] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchHandler = () => {
    props.searchDish(term);
  };
  const onInputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };
  useEffect(() => {
    focusInput();
  }, []);

  return (
    <header id="searchStart">
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
          Search
        </button>
      </div>
    </header>
  );
}
