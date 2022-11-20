import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import './UserHistory.css';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext';

import { firebaseURL } from '../../assets/db/firebaseurl';
import { Loading } from '../Loading/Loading';
import { sendNewOrder } from '../../utils/sendOrder';
import { getActuallyDate } from '../../utils/getActuallyDate';
import { OrderSummaryModal } from '../elements/OrderSummaryModal/OrderSummaryModal';

export function UserHistory() {
  const [allUsersMeals, setAllUsersMeals] = useState([]);
  const [showedOrders, setShowedOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [valueOfOrders, setValueOfOrders] = useState(0);
  const [howManyResultsShow, setHowManyResultsShow] = useState(5);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderID, setOrderID] = useState('');
  const [showInfoAfterRepeatedOrder, setShowInfoAfterRepeatedOrder] = useState(false);
  const navigate = useNavigate();
  const { userState } = useContext(isAuthenticatedContext);
  async function buyAgain(orderObj) {
    try {
      await sendNewOrder(orderObj);
      setShowInfoAfterRepeatedOrder(true);
      setTimeout(() => {
        setShowInfoAfterRepeatedOrder(false);
        navigate('/');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(`${firebaseURL}orders.json`);
        let res = await data.json();
        res = Object.values(res);
        res = res.filter((el) => el.userID === userState.localId);
        const orders = res.reverse();
        setAllUsersMeals(orders);
        setShowedOrders(orders.slice(0, howManyResultsShow));
        setLastOrder(res[0]);
        let totalValue = 0;
        res.forEach((el) => el.meals.forEach((el) => totalValue += el.price));
        setValueOfOrders(totalValue.toFixed(2));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        navigate('/error');
      }
    };
    getData();
  }, []);
  useEffect(() => {
    if (howManyResultsShow === 0) {
      setShowedOrders(allUsersMeals);
    } else {
      setShowedOrders(allUsersMeals.slice(0, howManyResultsShow));
    }
  }, [howManyResultsShow]);
  const showHistoryHandler = (e) => {
    setHowManyResultsShow(Number(e.target.value));
  };
  const showDetails = useCallback((orderIdNumber) => {
    if (orderIdNumber === orderID) {
      setShowOrderDetails(false);
      setOrderID('');
    } else {
      setOrderID(orderIdNumber);
      setShowOrderDetails(true);
    }
  }, [orderID]);
  if (!showInfoAfterRepeatedOrder) {
    return (
      <div className="container userHistory__container">
        {allUsersMeals.length < 1 ? (
          <section className="userHistory__container__status">
            {isLoading ? <Loading /> : <span className="userHistory__container--error"> Your orders history is empty</span>}
          </section>
        ) : (
          <>

            <div className="flex-sm-row userHistory__container__top">
              <div className="userHistory__container__lastOrder">
                <span>Last order</span>
                {lastOrder.meals.map((el) => (
                  <p key={Math.random() * 1000}>
                    {el.name}
                  </p>
                ))}

                <span>{lastOrder.date}</span>
              </div>
              <div className="userHistory__container__stats">
                <div>
                  <span>All orders: </span>
                  {allUsersMeals.length}
                </div>
                <div>
                  <span>Value of all orders:</span>
                  {valueOfOrders}
                  $
                </div>
              </div>
            </div>
            <div className="userHistory__select">
              <section>
                <label htmlFor="howManyShow">Show last</label>
                <select name="howManyShow" id="howManyShow" onChange={showHistoryHandler}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="0">All</option>
                </select>
                orders
              </section>
            </div>

            <div className="userHistory__container__bottom">
              <ul className="userHistory__container__bottom__list">
                {showedOrders.map((el) => (
                  <li key={el.date} className="userHistory__container__bottom__orderList">
                    <span className="userHistory__container__bottom__orderList--date">
                      {el.date.slice(0, 10)}
                    </span>
                    <section className="userHistory__container__bottom__orderList--summary">
                      <span>Total: </span>
                      <span>
                        {el.totalPrice}
                        $
                      </span>
                    </section>
                    <button className="btn-primary" onClick={() => showDetails(el.orderID)}>{showOrderDetails && el.orderID === orderID ? 'Hide' : 'Show more'}</button>
                    <div className={el.orderID === orderID && showOrderDetails ? 'userHistory__container__bottom__orderList--show' : 'userHistory__container__bottom__orderList--hide'}>
                      <p>{el.date}</p>
                      {el.meals.map((oneMeal) => (
                        <section key={Math.random() * 1000}>
                          {oneMeal.name}
                          <p className="userHistory__container__bottom__orderList--price">
                            {oneMeal.price.toFixed(2)}
                            $
                          </p>
                        </section>
                      ))}
                      <button
                        className="btn-primary"
                        onClick={() => buyAgain({
                          userID: el.userID,
                          date: getActuallyDate(),
                          meals: el.meals,
                          totalPrice: el.totalPrice,
                          orderID: v4(),
                        })}
                      >
                        Buy again
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

      </div>
    );
  }
  return <OrderSummaryModal />;
}
