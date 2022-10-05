import './App.css';
import { useEffect, useState } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Menu } from './components/Menu/Menu';
import { RegistrationForm } from './components/Formulars/RegistrationForm/RegistrationForm';
import AllFoodList from './components/Foods/AllFoodList/AllFoodList';
import { firebaseURL } from './assets/db/firebaseurl';
import { Loading } from './components/Assets/Loading/Loading';

import { DetailsFoodElement } from './components/Foods/DetailsFoodElement/DetailsFoodElement';
import { LoginForm } from './components/Formulars/LoginForm/LoginForm';
import { isAuthenticatedContext } from './context/isAuthenticatedContext';
import { Order } from './components/Order/Order';

function App() {
  const [elements, setElements] = useState([]);
  const [elementsBeforeSearch, setElementsBeforeSearch] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [idToken, setIdToken] = useState('');
  const [localId, setLocalId] = useState('');
  const [orderBucket, setOrderBucket] = useState([]);
  const userLoginHandler = (isAuth, userData) => {
    if (!isAuth) {
      setIsUserAuthenticated(false);
      setUserEmail('');
      setLocalId('');
      setIdToken('');
      localStorage.removeItem('user-data');
    } else {
      setIsUserAuthenticated(true);
      setUserEmail(userData.email);
      setLocalId(userData.localId);
      setIdToken(userData.idToken);
      localStorage.setItem('user-data', JSON.stringify(userData));
    }
  };
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user-data'));
      if (userDataFromLocalStorage) {
        userLoginHandler(true, userDataFromLocalStorage);
      }
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
  const addMealToOrder = (mealID) => {
    const meal = elementsBeforeSearch.find((el) => el.dataID === mealID);
    let { price } = meal;
    if (meal.specialOffer) {
      price *= 0.8;
    }
    const mealObj = {
      mealID, name: meal.name, price, date: '05.10.2022',
    };
    setOrderBucket((prevState) => [...prevState, mealObj]);
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
        <isAuthenticatedContext.Provider value={{
          isUserAuthenticated, userEmail, idToken, localId, userLoginHandler,
        }}
        >
          <Menu />
          {/* <button onClick={() => addMealToOrder('k3u2ht4j98jg23')}>Add test meal</button> */}
          {loading ? <Loading /> : (
            <Routes>
              <Route path="/" element={<AllFoodList elements={elements} searchFoodByCategory={searchFoodByCategory} addMealToOrder={addMealToOrder} />} />
              <Route path="/:dataID" element={<DetailsFoodElement db={elements} />} />
              <Route path="/signIn" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/order" element={<Order orderBucket={orderBucket} />} />
            </Routes>
          )}
        </isAuthenticatedContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
