import { useContext, useEffect, useState } from 'react';
import './UserHistory.css';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext';
import { Loading } from '../Assets/Loading/Loading';
import { firebaseURL } from '../../assets/db/firebaseurl';

export function UserHistory() {
  const [allUsersMeals, setAllUsersMeals] = useState([]);
  const [lastOrder, setLastOrder] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [valueOfOrders, setValueOfOrders] = useState(0);
  const { localId } = useContext(isAuthenticatedContext);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(`${firebaseURL}orders.json`);
        let res = await data.json();
        res = Object.values(res);
        res = res.filter((el) => el.userID === localId);
        setAllUsersMeals(res);
        setLastOrder(res[res.length - 1]);
        let totalValue = 0;
        res.forEach((el) => el.meals.forEach((el) => totalValue += el.price));
        setValueOfOrders(totalValue.toFixed(2));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <div className="container userHistory__container">
      {isLoading ? <Loading /> : (
        <>
          {allUsersMeals.length < 1 ? (
            <section>
              <span className="userHistory__container--error"> Your orders history is empty</span>
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
              <div className="userHistory__container__bottom">
                {allUsersMeals.map((el) => (
                  <ul key={el.date} className="userHistory__container__bottom__orderList">
                    <span className="userHistory__container__bottom__orderList--date">
                      {el.date.slice(0, 10)}
                    </span>
                    {el.meals.map((oneMeal) => (
                      <li key={Math.random() * 1000}>
                        {oneMeal.name}
                        <p className="userHistory__container__bottom__orderList--price">
                          {oneMeal.price.toFixed(2)}
                          $
                        </p>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </>
          )}
        </>
      )}

    </div>
  );
}
