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

function App() {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const data = await fetch(`${firebaseURL}.json`);
        const res = await data.json();
        setElements(res['-NBWqw4-lfq7TvejThYl']);
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
        {loading ? <Loading /> : (
          <Routes>
            <Route path="/" element={<AllFoodList randomElement={elements[0]} elements={elements} />} />
            <Route path="/signIn" element={<RegistrationForm />} />
          </Routes>
        )}

      </BrowserRouter>
    </>
  );
}

export default App;
