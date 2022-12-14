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
import { OrdersHistory } from '../OrdersHistory/OrdersHistory';
import { AboutApp } from '../AboutApp/AboutApp';
import { AppHistory } from '../AppHistory/AppHistory';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { GoToTopButton } from '../elements/GoTopButton/GoToTopButton';
import AllFoodList from '../Foods/AllFoodList/AllFoodList';
import { useGetAllMeals } from '../../hooks/useGetAllMeals';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext';
import { mealInterface } from '../../interfaces/mealInterface';
import { orderCartInterface } from '../../interfaces/orderObjectInterface';
import { userDataInterface } from '../../interfaces/userDataInterface';
import { ChangePageColor } from '../elements/ChangePageColor/ChangePageColor';
import { CodeExamples } from '../CodeExamples/Code';
import { routes } from '../../routes/routes';

export function Main() {
  const { allElements, isLoading } = useGetAllMeals();
  const [elements, setElements] = useState<[] | mealInterface[]>([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const [orderCart, setOrderCart] = useState<[] | orderCartInterface[]>([]);
  const [mealsFilter, setMealsFilter] = useState<string>('');
  const [showNotFinishedOrderModal, setNotFinishedOrderModal] = useState<boolean>(false);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [userState, setUserState] = useState<userDataInterface>({
    userEmail: '',
    idToken: '',
    localId: '',
  });
  const [mainState, setMainState] = useState({
    showLogoutModal: false,
    addProductToCart: false,
  });
  const [colorStyle, setColorStyle] = useState<boolean>(false);
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
  const userLoginHandler = (isAuth:boolean, userData:userDataInterface) => {
    if (!isAuth) {
      setMainState({ ...mainState, showLogoutModal: true });
      setIsUserAuthenticated(false);
      setUserState({ userEmail: '', idToken: '', localId: '' });
      setOrderCart([]);
      localStorage.removeItem('user-data');
      localStorage.setItem('oldOrder', JSON.stringify([]));
      navigate(routes.mainPage);
    } else {
      setIsUserAuthenticated(true);
      setUserState({ userEmail: userData.userEmail, idToken: userData.idToken, localId: userData.localId });
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
    // @ts-ignore
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user-data'));
    if (userDataFromLocalStorage) {
      userLoginHandler(true, userDataFromLocalStorage);
      setOldOrder();
    }
  }, []);

  // add element to order
  const addMealToOrder = (mealID:string) => {
    if (!isUserAuthenticated) return;
    const meal = allElements.find((el) => el.dataID === mealID);
    if (meal !== undefined) {
      let { price } = meal;
      if (meal?.specialOffer) {
        price *= 0.8;
      }
      // @ts-ignore
      let oldOrder = JSON.parse(localStorage.getItem('oldOrder'));
      const isItemAlreadyAdded = orderCart.find((el) => el.mealID === mealID);
      if (isItemAlreadyAdded) {
        isItemAlreadyAdded.quantity++;
        const allItems = orderCart.filter((el) => el.mealID !== mealID);
        setOrderCart([...allItems, isItemAlreadyAdded]);
        oldOrder = oldOrder.filter((el:orderCartInterface) => el.mealID !== mealID);
        oldOrder.unshift(isItemAlreadyAdded);
        localStorage.setItem('oldOrder', JSON.stringify(oldOrder));
      } else {
        const mealObj = {
          mealID, name: meal?.name, price, quantity: 1,
        };
        oldOrder.unshift(mealObj);
        localStorage.setItem('oldOrder', JSON.stringify(oldOrder));
        setOrderCart((prevState) => [...prevState, mealObj]);
      }
      setMainState({ ...mainState, addProductToCart: true });
      setTimeout(() => {
        setMainState({ ...mainState, addProductToCart: false });
      }, 1000);
    }
  };

  // remove element from order
  const removeMealFromOrder = (mealID:string) => {
    const itemToRemove = orderCart.find((el) => el.mealID === mealID);
    if (itemToRemove !== undefined) {
      // @ts-ignore
      const itemIndex:number = orderCart.indexOf(itemToRemove);
      const meals = orderCart.filter((el) => el.mealID !== mealID);
      if (itemToRemove.quantity > 1) {
        itemToRemove.quantity--;
        meals.splice(itemIndex, 0, itemToRemove);
        setOrderCart(meals);
      } else {
        setOrderCart(meals);
      }
      localStorage.setItem('oldOrder', JSON.stringify(meals));
    }
  };
  const clearOrder = useCallback(() => {
    setOrderCart([]);
  }, []);

  // search element from all meals
  const searchElement = (value:string) => {
    setMealsFilter(value);
    const filteredElements = allElements.filter((el) => el.name.toLowerCase().includes(value.toLowerCase())
            || el.description.toLowerCase().includes(value.toLowerCase()));
    setElements(filteredElements);
  };

  // set search category
  const searchFoodByCategory = (category:string | boolean) => {
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
    if (typeof category === 'string') {
      setMealsFilter(category[0].toUpperCase().concat(category.slice(1)));
    }
    setElements(filteredElements);
  };
  function changePageColors():void {
    colorStyle ? setColorStyle(false) : setColorStyle(true);
  }

  return (
    <section className={`mainSection__container ${colorStyle ? 'secondColorStyle' : ''}`}>
      <GoToTopButton />
      <ChangePageColor changeColorHandler={changePageColors} />
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

            <Route path={routes.mainPage} element={<AllFoodList elements={elements} searchFoodByCategory={searchFoodByCategory} addMealToOrder={addMealToOrder} mealsFilter={mealsFilter} />} />
            <Route path={`${routes.products}:dataID`} element={<DetailsFoodElement db={elements} addMealToOrder={addMealToOrder} />} />
            <Route path={routes.login} element={<LoginForm />} />
            <Route path={routes.signIn} element={<RegistrationForm />} />
            <Route path={routes.order} element={isUserAuthenticated ? <Order orderCart={orderCart} removeMeal={removeMealFromOrder} clearOrder={clearOrder} /> : <Navigate to={routes.mainPage} />} />
            <Route path={routes.user} element={isUserAuthenticated ? <UserPage /> : <Navigate to={routes.mainPage} />} />
            <Route path={routes.userPasswordReset} element={<PasswordChange />} />
            <Route path={routes.userEmailChange} element={<EmailChange />} />
            <Route path={routes.userAccountDelete} element={isUserAuthenticated ? <DeleteAccountSummary /> : <Navigate to={routes.mainPage} />} />
            <Route path={routes.ordersHistory} element={isUserAuthenticated ? <OrdersHistory /> : <Navigate to={routes.mainPage} />} />
            <Route path={routes.aboutApp} element={<AboutApp />} />
            <Route path={routes.appHistory} element={<AppHistory />} />
            <Route path={routes.errorPage} element={<ErrorPage />} />
            <Route path={routes.codesExamples} element={<CodeExamples />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </isAuthenticatedContext.Provider>
    </section>
  );
}
