import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Menu } from './components/Menu/Menu';
import { RegistrationForm } from './components/Formulars/RegistrationForm';
import AllFoodList from './components/Foods/AllFoodList/AllFoodList';
import { firebaseURL } from './assets/db/firebaseurl';
import { Loading } from './components/Assets/Loading/Loading';

import { DetailsFoodElement } from './components/Foods/DetailsFoodElement/DetailsFoodElement';

function App() {
  const [elements, setElements] = useState([]);
  const [elementsBeforeSearch, setElementsBeforeSearch] = useState([]);
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
        <Menu />
        {loading ? <Loading /> : (
          <Routes>
            <Route path="/" element={<AllFoodList elements={elements} searchFoodByCategory={searchFoodByCategory} />} />
            <Route path="/:dataID" element={<DetailsFoodElement db={elements} />} />
            <Route path="/signIn" element={<RegistrationForm />} />
          </Routes>
        )}

      </BrowserRouter>
    </>
  );
}

export default App;
