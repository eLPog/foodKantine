import { useCallback, useEffect, useState } from 'react';
import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import { Backdrop } from '../Modals/Backdrop/Backdrop';
import { NotFinishedOrderModal } from '../Modals/NotFinishedOrderModal/NotFinishedOrderModal';
import { Header } from '../Header/Header';
import { FirstVisitPage } from '../FirstVisitPage/FirstVisitPage';
import { Logout } from '../Logout/Logout';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext';
import { Menu } from '../Menu/Menu';
import { Loading } from '../Loading/Loading';
import AllFoodList from '../Foods/AllFoodList/AllFoodList';
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
import { getProducts } from '../../utils/fetchMeals';
import { GoToTopButton } from '../elements/GoTopButton/GoToTopButton';

export function Main() {
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
  const navigate = useNavigate();

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      localStorage.setItem('firstVisit', JSON.stringify(true));
      setIsFirstVisit(true);
    }
  }, []);
  const firstVisitHandler = useCallback(() => {
    setIsFirstVisit(false);
  }, []);
  const logoutModalHandler = useCallback(() => {
    setShowLogoutModal(false);
  }, []);

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
      navigate('/');
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
    (async () => {
      setIsLoading(true);
      const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user-data'));
      if (userDataFromLocalStorage) {
        userLoginHandler(true, userDataFromLocalStorage);
      }
      try {
        const res = await getProducts();
        setElements(res['-NCAQYq_QqAk59rSL8Bq']);
        setElementsBeforeSearch(res['-NCAQYq_QqAk59rSL8Bq']);
      } catch (err) {
        console.log(err);
        navigate('/error');
      } finally {
        setIsLoading(false);
      }
    })();
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
      {showLogoutModal && (
        <>
          <Backdrop />
          <Logout logoutModalHandler={logoutModalHandler} />
        </>
      )}
      <isAuthenticatedContext.Provider value={{
        isUserAuthenticated, userEmail, idToken, localId, userLoginHandler,
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
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signIn" element={<RegistrationForm />} />
            <Route path="/order" element={isUserAuthenticated ? <Order orderCart={orderCart} userID={localId} removeMeal={removeMealFromOrder} clearOrder={clearOrder} /> : <Navigate to="/" />} />
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
