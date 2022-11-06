import './App.css';
import { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, useNavigate,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Menu } from './components/Menu/Menu';
import { RegistrationForm } from './components/Formulars/RegistrationForm/RegistrationForm';
import AllFoodList from './components/Foods/AllFoodList/AllFoodList';
import { firebaseURL } from './assets/db/firebaseurl';
import { Loading } from './components/Loading/Loading';

import { DetailsFoodElement } from './components/Foods/DetailsFoodElement/DetailsFoodElement';
import { LoginForm } from './components/Formulars/LoginForm/LoginForm';
import { isAuthenticatedContext } from './context/isAuthenticatedContext';
import { Order } from './components/Order/Order';
import { UserHistory } from './components/UserHistory/UserHistory';
import { UserPage } from './components/UserPages/UserPage/UserPage';
import { PasswordChange } from './components/UserPages/PasswordChange/PasswordChange';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { EmailChange } from './components/UserPages/EmailChange/EmailChange';
import { DeleteAccountSummary } from './components/UserPages/DeleteAccountSummary/DeleteAccountSummary';
import { Backdrop } from './components/Modals/Backdrop/Backdrop';
import { NotFinishedOrderModal } from './components/Modals/NotFinishedOrderModal/NotFinishedOrderModal';
import { FirstVisitPage } from './components/FirstVisitPage/FirstVisitPage';
import { AboutApp } from './components/AboutApp/AboutApp';
import { Logout } from './components/Logout/Logout';

function App() {
  const [elements, setElements] = useState([]);
  const [elementsBeforeSearch, setElementsBeforeSearch] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [idToken, setIdToken] = useState('');
  const [localId, setLocalId] = useState('');
  const [orderCart, setOrderCart] = useState([]);
  const [addProductToCart, setAddProductToCart] = useState(false);
  const [mealsFilter, setMealsFilter] = useState('');
  const [showNotFinishedOrderModal, setNotFinishedOrderModal] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      localStorage.setItem('firstVisit', JSON.stringify(true));
      setIsFirstVisit(true);
    }
  }, []);
  const firstVisitHandler = useCallback(() => {
    setIsFirstVisit(false);
  });
  const logoutModalHandler = useCallback(() => {
    setShowLogoutModal(false);
  });

  const userLoginHandler = (isAuth, userData) => {
    if (!isAuth) {
      setShowLogoutModal(true);
      setIsUserAuthenticated(false);
      setUserEmail('');
      setLocalId('');
      setIdToken('');
      setOrderCart([]);
      localStorage.removeItem('user-data');
      localStorage.setItem('oldOrder', JSON.stringify([]));
    } else {
      setIsUserAuthenticated(true);
      setUserEmail(userData.email);
      setLocalId(userData.localId);
      setIdToken(userData.idToken);
      localStorage.setItem('user-data', JSON.stringify(userData));
    }
  };
  const oldOrderModalHandler = useCallback(() => {
    setNotFinishedOrderModal(false);
  }, []);
  const setOldOrder = useCallback(() => {
    const oldOrder = JSON.parse(localStorage.getItem('oldOrder'));
    if (oldOrder) {
      setOrderCart([...oldOrder]);
      if (oldOrder.length > 0)setNotFinishedOrderModal(true);
    } else {
      localStorage.setItem('oldOrder', JSON.stringify([]));
    }
  }, []);
  useEffect(() => {
    setOldOrder();
    const fetchMeals = async () => {
      setIsLoading(true);
      const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user-data'));
      if (userDataFromLocalStorage) {
        userLoginHandler(true, userDataFromLocalStorage);
      }
      try {
        const data = await fetch(`${firebaseURL}.json`);
        const res = await data.json();
        setElements(res['-NCAQYq_QqAk59rSL8Bq']);
        setElementsBeforeSearch(res['-NCAQYq_QqAk59rSL8Bq']);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeals();
  }, []);
  const addMealToOrder = (mealID) => {
    if (!isUserAuthenticated) return;
    const meal = elementsBeforeSearch.find((el) => el.dataID === mealID);
    let { price } = meal;
    if (meal.specialOffer) {
      price *= 0.8;
    }
    let oldOrder = JSON.parse(localStorage.getItem('oldOrder'));
    const isItemAlreadyAdded = orderCart.find((el) => el.mealID === mealID);
    if (isItemAlreadyAdded) {
      isItemAlreadyAdded.quantity++;
      const allItems = orderCart.filter((el) => el.mealID !== mealID);
      setOrderCart([...allItems, isItemAlreadyAdded]);
      oldOrder = oldOrder.filter((el) => el.mealID !== mealID);
      oldOrder.unshift(isItemAlreadyAdded);
      localStorage.setItem('oldOrder', JSON.stringify(oldOrder));
    } else {
      const mealObj = {
        mealID, name: meal.name, price, quantity: 1,
      };
      oldOrder.unshift(mealObj);
      localStorage.setItem('oldOrder', JSON.stringify(oldOrder));
      setOrderCart((prevState) => [...prevState, mealObj]);
    }
    setAddProductToCart(true);
    setTimeout(() => {
      setAddProductToCart(false);
    }, 1000);
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
    localStorage.setItem('oldOrder', JSON.stringify(meals));
  };
  const clearOrder = useCallback(() => {
    setOrderCart([]);
  }, []);
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
      {showNotFinishedOrderModal && (
      <>
        <Backdrop />
        <NotFinishedOrderModal closeModal={oldOrderModalHandler} />
      </>
      )}
      <Header searchDish={searchElement} />
      <BrowserRouter>
        {isFirstVisit && (
        <>
          <Backdrop />
          <FirstVisitPage closeModal={firstVisitHandler} />
        </>
        )}
        {showLogoutModal && (
        <>
          <Backdrop />
          <Logout logoutModalHandler={logoutModalHandler} />
        </>
        )}
        <isAuthenticatedContext.Provider value={{
          isUserAuthenticated, userEmail, idToken, localId,
        }}
        >
          <Menu numbersOfItemsInOrdersCart={orderCart.length} newProductAdded={addProductToCart} userLoginHandler={userLoginHandler} />
          {isLoading ? (
            <section className="main__loading">
              <Loading />
            </section>
          ) : (
            <Routes>
              <Route path="/" element={<AllFoodList elements={elements} searchFoodByCategory={searchFoodByCategory} addMealToOrder={addMealToOrder} mealsFilter={mealsFilter} />} />
              <Route path="/products/:dataID" element={<DetailsFoodElement db={elements} addMealToOrder={addMealToOrder} />} />
              <Route path="/login" element={<LoginForm userLoginHandler={userLoginHandler} />} />
              <Route path="/signIn" element={<RegistrationForm userLoginHandler={userLoginHandler} />} />
              <Route path="/order" element={isUserAuthenticated ? <Order orderCart={orderCart} userID={localId} removeMeal={removeMealFromOrder} clearOrder={clearOrder} /> : <Navigate to="/" />} />
              <Route path="/user" element={isUserAuthenticated ? <UserPage /> : <Navigate to="/" />} />
              <Route path="/user/passwordReset" element={<PasswordChange userLoginHandler={userLoginHandler} />} />
              <Route path="/user/emailChange" element={<EmailChange userLoginHandler={userLoginHandler} />} />
              <Route path="/user/delete" element={isUserAuthenticated ? <DeleteAccountSummary userLoginHandler={userLoginHandler} /> : <Navigate to="/" />} />
              <Route path="/history" element={isUserAuthenticated ? <UserHistory /> : <Navigate to="/" />} />
              <Route path="/aboutApp" element={<AboutApp />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </isAuthenticatedContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
