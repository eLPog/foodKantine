import './App.css';
import { useEffect, useState } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
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
import { UserHistory } from './components/UserHistory/UserHistory';

function App() {
  const [elements, setElements] = useState([]);
  const [elementsBeforeSearch, setElementsBeforeSearch] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [idToken, setIdToken] = useState('');
  const [localId, setLocalId] = useState('');
  const [orderCart, setOrderCart] = useState([]);
  const [addProductToCart, setAddProductToCart] = useState(false);
  const [mealsFilter, setMealsFilter] = useState('');

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
    const isItemAlreadyAdded = orderCart.find((el) => el.mealID === mealID);
    if (isItemAlreadyAdded) {
      isItemAlreadyAdded.quantity++;
      const allItems = orderCart.filter((el) => el.mealID !== mealID);
      setOrderCart([...allItems, isItemAlreadyAdded]);
    } else {
      const mealObj = {
        mealID, name: meal.name, price, quantity: 1,
      };
      setOrderCart((prevState) => [...prevState, mealObj]);
    }
    setAddProductToCart(true);
    setTimeout(() => {
      setAddProductToCart(false);
    }, 800);
  };
  const removeMealFromOrder = (mealID) => {
    const itemToRemove = orderCart.find((el) => el.mealID === mealID);
    const itemIndex = orderCart.indexOf(itemToRemove);
    const meals = orderCart.filter((el) => el.mealID !== mealID);
    if (itemToRemove.quantity > 1) {
      itemToRemove.quantity--;
      meals.splice(itemIndex, 0, itemToRemove);
      setOrderCart(meals);
    } else {
      setOrderCart(meals);
    }
  };
  const clearOrder = () => {
    setOrderCart([]);
  };
  const searchElement = (value) => {
    setMealsFilter(value);
    const filteredElements = elementsBeforeSearch.filter((el) => el.name.toLowerCase().includes(value.toLowerCase())
            || el.description.toLowerCase().includes(value.toLowerCase()));
    setElements(filteredElements);
  };
  const searchFoodByCategory = (category) => {
    if (!category) {
      setMealsFilter('All');
      setElements(elementsBeforeSearch);
      return;
    }
    if (category === 'sale') {
      const filteredElements = elementsBeforeSearch.filter((el) => el.specialOffer === true);
      setElements(filteredElements);
      setMealsFilter('Sale');
      return;
    }
    const filteredElements = elementsBeforeSearch.filter((el) => el.category === category);
    setMealsFilter(category[0].toUpperCase().concat(category.slice(1)));
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
          <Menu numbersOfItemsInOrdersCart={orderCart.length} newProductAdded={addProductToCart} />
          {loading ? <Loading /> : (
            <Routes>
              <Route path="/" element={<AllFoodList elements={elements} searchFoodByCategory={searchFoodByCategory} addMealToOrder={addMealToOrder} mealsFilter={mealsFilter} />} />
              <Route path="/:dataID" element={<DetailsFoodElement db={elements} addMealToOrder={addMealToOrder} />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signIn" element={<RegistrationForm />} />
              <Route path="/order" element={isUserAuthenticated ? <Order orderCart={orderCart} userID={localId} removeMeal={removeMealFromOrder} clearOrder={clearOrder} /> : <Navigate to="/" />} />
              <Route path="/history" element={isUserAuthenticated ? <UserHistory /> : <Navigate to="/" />} />
            </Routes>
          )}
        </isAuthenticatedContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
