import { useCallback, useEffect, useState } from 'react';
import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import { Backdrop } from '../Modals/Backdrop/Backdrop';
import { NotFinishedOrderModal } from '../Modals/NotFinishedOrderModal/NotFinishedOrderModal';
import { Header } from '../Header/Header';
import { FirstVisitPage } from '../FirstVisitPage/FirstVisitPage';
import { Logout } from '../Logout/Logout';
import { Menu } from '../Menu/Menu';
import { Loading } from '../Loading/Loading';
import { DetailsFoodElement } from '../Foods/DetailsFoodElement/DetailsFoodElement';
import { LoginForm } from '../Formulars/LoginForm/LoginForm';
import { RegistrationForm } from '../Formulars/RegistrationForm/RegistrationForm';
import { Order } from '../Order/Order';
import { UserPage } from '../UserPages/UserPage/UserPage';
import { PasswordChange } from '../UserPages/PasswordChange/PasswordChange';
import { EmailChange } from '../UserPages/EmailChange/EmailChange';
import { DeleteAccountSummary } from '../UserPages/DeleteAccountSummary/DeleteAccountSummary';
import { UserHistory } from '../UserHistory/UserHistory';
import { AboutApp } from '../AboutApp/AboutApp';
import { AppHistory } from '../AppHistory/AppHistory';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { GoToTopButton } from '../elements/GoTopButton/GoToTopButton';
import AllFoodList from '../Foods/AllFoodList/AllFoodList';
import { useGetAllMeals } from '../../hooks/useGetAllMeals';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext'

export function Main() {
  const { allElements, isLoading } = useGetAllMeals();
  const [elements, setElements] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [orderCart, setOrderCart] = useState([]);
  const [mealsFilter, setMealsFilter] = useState('');
  const [showNotFinishedOrderModal, setNotFinishedOrderModal] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [userState, setUserState] = useState({
    userEmail: '',
    idToken: '',
    localId: '',
  });
  const [mainState, setMainState] = useState({
    showLogoutModal: false,
    addProductToCart: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    setElements(allElements);
  }, [allElements]);

  // check if user visit this page first time and save result to LS
  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      setIsFirstVisit(true);
      localStorage.setItem('firstVisit', JSON.stringify(true));
    }
  }, []);
  const firstVisitHandler = useCallback(() => {
    setIsFirstVisit(false);
  }, []);
  const logoutModalHandler = useCallback(() => {
    setMainState({ ...mainState, showLogoutModal: false });
  }, []);

  // handling on user login
  const userLoginHandler = (isAuth, userData) => {
    if (!isAuth) {
      setMainState({ ...mainState, showLogoutModal: true });
      setIsUserAuthenticated(false);
      setUserState({ userEmail: '', idToken: '', localId: '' });
      setOrderCart([]);
      localStorage.removeItem('user-data');
      localStorage.setItem('oldOrder', JSON.stringify([]));
      navigate('/');
    } else {
      setIsUserAuthenticated(true);
      setUserState({ userEmail: userData.email, idToken: userData.idToken, localId: userData.localId });
      localStorage.setItem('user-data', JSON.stringify(userData));
    }
  };
  // check if user has unfinished order and if true - set this order to actually order
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

  // check if user was already logged and if he has unfinished order
  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user-data'));
    if (userDataFromLocalStorage) {
      userLoginHandler(true, userDataFromLocalStorage);
      setOldOrder();
    }
  }, []);

  // add element to order
  const addMealToOrder = (mealID) => {
    if (!isUserAuthenticated) return;
    const meal = allElements.find((el) => el.dataID === mealID);
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
    setMainState({ ...mainState, addProductToCart: true });
    setTimeout(() => {
      setMainState({ ...mainState, addProductToCart: false });
    }, 1000);
  };

  // remove element from order
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

  // search element from all meals
  const searchElement = (value) => {
    setMealsFilter(value);
    const filteredElements = allElements.filter((el) => el.name.toLowerCase().includes(value.toLowerCase())
            || el.description.toLowerCase().includes(value.toLowerCase()));
    setElements(filteredElements);
  };

  // set search category
  const searchFoodByCategory = (category) => {
    if (!category) {
      setMealsFilter('All');
      setElements(allElements);
      return;
    }
    if (category === 'sale') {
      const filteredElements = allElements.filter((el) => el.specialOffer === true);
      setElements(filteredElements);
      setMealsFilter('Sale');
      return;
    }
    const filteredElements = allElements.filter((el) => el.category === category);
    setMealsFilter(category[0].toUpperCase().concat(category.slice(1)));
    setElements(filteredElements);
  };
  return (
    <>
      <GoToTopButton />

      {showNotFinishedOrderModal && (
        <>
          <Backdrop />
          <NotFinishedOrderModal closeModal={oldOrderModalHandler} />
        </>
      )}
      <Header searchDish={searchElement} />
      {isFirstVisit && (
        <>
          <Backdrop />
          <FirstVisitPage closeModal={firstVisitHandler} />
        </>
      )}
      {mainState.showLogoutModal && (
        <>
          <Backdrop />
          <Logout logoutModalHandler={logoutModalHandler} />
        </>
      )}
      <isAuthenticatedContext.Provider value={{
        isUserAuthenticated, userState, userLoginHandler,
      }}
      >
        <Menu numbersOfItemsInOrdersCart={orderCart.length} newProductAdded={mainState.addProductToCart} />
        {isLoading ? (
          <section className="main__loading">
            <Loading />
          </section>
        ) : (
          <Routes>
            <Route path="/" element={<AllFoodList elements={elements} searchFoodByCategory={searchFoodByCategory} addMealToOrder={addMealToOrder} mealsFilter={mealsFilter} />} />
            <Route path="/products/:dataID" element={<DetailsFoodElement db={elements} addMealToOrder={addMealToOrder} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signIn" element={<RegistrationForm />} />
            <Route path="/order" element={isUserAuthenticated ? <Order orderCart={orderCart} removeMeal={removeMealFromOrder} clearOrder={clearOrder} /> : <Navigate to="/" />} />
            <Route path="/user" element={isUserAuthenticated ? <UserPage /> : <Navigate to="/" />} />
            <Route path="/user/passwordReset" element={<PasswordChange />} />
            <Route path="/user/emailChange" element={<EmailChange />} />
            <Route path="/user/delete" element={isUserAuthenticated ? <DeleteAccountSummary /> : <Navigate to="/" />} />
            <Route path="/history" element={isUserAuthenticated ? <UserHistory /> : <Navigate to="/" />} />
            <Route path="/aboutApp" element={<AboutApp />} />
            <Route path="/appHistory" element={<AppHistory />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </isAuthenticatedContext.Provider>
    </>
  );
}
