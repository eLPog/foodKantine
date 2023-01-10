import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseURL } from '../assets/db/firebaseurl';
import { isAuthenticatedContext } from '../context/isAuthenticatedContext';
import { orderFromFetchInterface, orderObjectInterface } from '../interfaces/orderObjectInterface';
import { routes } from '../routes/routes';

interface stateObject {
  allUserOrders:[] | orderFromFetchInterface[],
  lastOrder:null | orderObjectInterface,
  isLoading:boolean,
  totalValue:number
}
export function useOrdersHistory() {
  const { userState } = useContext(isAuthenticatedContext);
  const navigate = useNavigate();
  const [ordersHistory, setOrdersHistory] = useState<stateObject>({
    allUserOrders: [], lastOrder: null, isLoading: true, totalValue: 0,
  });
  useEffect(() => {
    setOrdersHistory({
      allUserOrders: [], lastOrder: null, isLoading: true, totalValue: 0,
    });
    (async function getData() {
      try {
        const data = await fetch(`${firebaseURL}orders.json`);
        const arrOfAllOrders = await data.json();
        let res:orderFromFetchInterface[] = Object.values(arrOfAllOrders);
        res = res.filter((el:orderFromFetchInterface) => el.userID === userState.localId);
        res = res.reverse();
        let totalValue = 0;
        res.forEach((el:orderFromFetchInterface) => el.meals.forEach((el) => totalValue += el.price));
        setOrdersHistory({
          allUserOrders: res, lastOrder: res[0], isLoading: false, totalValue,
        });
      } catch (err) {
        console.log(err);
        navigate(routes.errorPage);
      }
    }());
  }, [setOrdersHistory, userState]);
  return ordersHistory;
}
