import React, {
  useCallback, useEffect, useState,
} from 'react';
import './OrdersHistory.css';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Loading } from '../Loading/Loading';
import { sendNewOrder } from '../../utils/sendOrder';
import { getActuallyDate } from '../../utils/getActuallyDate';
import { OrderSummaryModal } from '../elements/OrderSummaryModal/OrderSummaryModal';
import { useOrdersHistory } from '../../hooks/useOrdersHistory';
import { orderFromFetchInterface, orderObjectInterface } from '../../interfaces/orderObjectInterface';

export function OrdersHistory() {
  const [howManyResultsShow, setHowManyResultsShow] = useState(5);
  const {
    lastOrder, totalValue, isLoading, allUserOrders,
  } = useOrdersHistory();
  const [showedOrders, setShowedOrders] = useState<[]|orderFromFetchInterface[]>([]);
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const [orderID, setOrderID] = useState<String>('');
  const [showInfoAfterRepeatedOrder, setShowInfoAfterRepeatedOrder] = useState<boolean>(false);
  const navigate = useNavigate();
  async function buyAgain(orderObj:orderObjectInterface) {
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
    if (howManyResultsShow === 0) {
      setShowedOrders(allUserOrders);
    } else {
      setShowedOrders(allUserOrders.slice(0, howManyResultsShow));
    }
  }, [howManyResultsShow, allUserOrders]);
  const showHistoryHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setHowManyResultsShow(Number(e.target.value));
  };
  const showDetails = useCallback((orderIdNumber:string) => {
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
        {allUserOrders.length < 1 ? (
          <section className="userHistory__container__status">
            {isLoading ? <Loading /> : <span className="userHistory__container--error"> Your orders history is empty</span>}
          </section>
        ) : (
          <>

            <div className="flex-sm-row userHistory__container__top">
              <div className="userHistory__container__lastOrder">
                <span>Last order</span>
                {lastOrder?.meals.map((el) => (
                  <p key={Math.random() * 1000}>
                    {el.name}
                  </p>
                ))}

                <span>{lastOrder?.date}</span>
              </div>
              <div className="userHistory__container__stats">
                <div>
                  <span>All orders: </span>
                  {allUserOrders.length}
                </div>
                <div>
                  <span>Value of all orders:</span>
                  {totalValue.toFixed(2)}
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
