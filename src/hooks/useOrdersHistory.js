import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseURL } from '../assets/db/firebaseurl';
import { isAuthenticatedContext } from '../context/isAuthenticatedContext';

export function useOrdersHistory() {
  const { userState } = useContext(isAuthenticatedContext);
  const navigate = useNavigate();
  const [ordersHistory, setOrdersHistory] = useState({
    allUserOrders: [], lastOrder: null, isLoading: true, totalValue: 0,
  });
  useEffect(() => {
    setOrdersHistory({
      allUserOrders: [], lastOrder: null, isLoading: true, totalValue: 0,
    });
    (async function getData() {
      try {
        const data = await fetch(`${firebaseURL}orders.json`);
        let res = await data.json();
        res = Object.values(res);
        res = res.filter((el) => el.userID === userState.localId);
        res = res.reverse();
        let totalValue = 0;
        res.forEach((el) => el.meals.forEach((el) => totalValue += el.price));
        setOrdersHistory({
          allUserOrders: res, lastOrder: res[0], isLoading: false, totalValue,
        });
      } catch (err) {
        console.log(err);
        navigate('/error');
      }
    }());
  }, [setOrdersHistory, userState]);
  return ordersHistory;
}
