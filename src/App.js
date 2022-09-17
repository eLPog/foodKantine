import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Menu } from './components/Menu/Menu';
import { db } from './assets/db/db';
import { RegistrationForm } from './components/Formulars/RegistrationForm';
import AllFoodList from './components/Foods/AllFoodList/AllFoodList';
import { firebaseURL } from './assets/db/firebaseurl';
import { Loading } from './components/Assets/Loading/Loading';

import { DetailsFoodElement } from './components/Foods/DetailsFoodElement/DetailsFoodElement';

function App() {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      // setLoading(true);
      try {
        const data = await fetch(`${firebaseURL}.json`);
        const res = await data.json();
        console.log(res);
        setElements(res['-NCAQYq_QqAk59rSL8Bq']);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeals();
  }, []);
  const searchElement = (value) => {
    const filteredElements = db.filter((el) => el.name.toLowerCase().includes(value.toLowerCase())
            || el.description.toLowerCase().includes(value.toLowerCase()));
    setElements(filteredElements);
  };

  return (
    <>
      <Header searchDish={searchElement} />
      <BrowserRouter>
        <Menu />

        <Routes>
          <Route path="/" element={<AllFoodList elements={elements} />} />
          <Route path="/:dataID" element={<DetailsFoodElement db={elements} />} />
          <Route path="/signIn" element={<RegistrationForm />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
