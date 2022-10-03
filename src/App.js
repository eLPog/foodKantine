import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Menu } from './components/Menu/Menu';
import { RegistrationForm } from './components/Formulars/RegistrationForm/RegistrationForm';
import AllFoodList from './components/Foods/AllFoodList/AllFoodList';
import { firebaseURL } from './assets/db/firebaseurl';
import { Loading } from './components/Assets/Loading/Loading';

import { DetailsFoodElement } from './components/Foods/DetailsFoodElement/DetailsFoodElement';
import { LoginForm } from './components/Formulars/LoginForm/LoginForm';
import { isAuthenticatedContext } from './context/isAuthenticatedContext';

function App() {
  const [elements, setElements] = useState([]);
  const [elementsBeforeSearch, setElementsBeforeSearch] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const data = await fetch(`${firebaseURL}.json`);
        const res = await data.json();
        setElements(res['-NCAQYq_QqAk59rSL8Bq']);
        setElementsBeforeSearch(res['-NCAQYq_QqAk59rSL8Bq']);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeals();
  }, []);
  const userLoginHandler = () => {
    isUserAuthenticated ? setIsUserAuthenticated(false) : setIsUserAuthenticated(true);
  };
  const searchElement = (value) => {
    const filteredElements = elementsBeforeSearch.filter((el) => el.name.toLowerCase().includes(value.toLowerCase())
            || el.description.toLowerCase().includes(value.toLowerCase()));
    setElements(filteredElements);
  };
  const searchFoodByCategory = (category) => {
    if (!category) {
      setElements(elementsBeforeSearch);
      return;
    }
    if (category === 'sale') {
      const filteredElements = elementsBeforeSearch.filter((el) => el.specialOffer === true);
      setElements(filteredElements);
      return;
    }
    const filteredElements = elementsBeforeSearch.filter((el) => el.category === category);
    setElements(filteredElements);
  };

  return (
    <>
      <Header searchDish={searchElement} />
      <BrowserRouter>
        <isAuthenticatedContext.Provider value={{ isUserAuthenticated, userLoginHandler }}>
          <Menu />
          <h1>{isUserAuthenticated ? 'Zalogowany' : 'Nie zalogowany'}</h1>
          {loading ? <Loading /> : (
            <Routes>
              <Route path="/" element={<AllFoodList elements={elements} searchFoodByCategory={searchFoodByCategory} />} />
              <Route path="/:dataID" element={<DetailsFoodElement db={elements} />} />
              <Route path="/signIn" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          )}
        </isAuthenticatedContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
