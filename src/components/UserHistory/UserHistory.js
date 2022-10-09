import { useContext, useEffect, useState } from 'react';
import './UserHistory.css';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext';

// pobrać https://foodkantine-a6214-default-rtdb.europe-west1.firebasedatabase.app/orders
export function UserHistory() {
  const [allUsersMeals, setAllUsersMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { localId } = useContext(isAuthenticatedContext);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch('https://foodkantine-a6214-default-rtdb.europe-west1.firebasedatabase.app/orders.json');
        let res = await data.json();
        res = Object.values(res);
        setAllUsersMeals(res);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="container userHistory__container">
      {isLoading ? <h2>Loading</h2> : (
        <>
          <div className="userHistory__container__top">
            <div className="userHistory__container__lastOrders">
              <ul>
                {allUsersMeals.map((el) => (
                  <ul key={el.date}>
                    {el.date}
                    {el.meals.map((oneMeal) => (
                      <li key={Math.random() * 1000}>{oneMeal.name}</li>
                    ))}
                  </ul>
                ))}
              </ul>
            </div>
            <div className="userHistory__container__stats">
              Zamówiono razem:3
              <br />
              Całkowity koszt:100
              <br />
              Ostatnie zamówienie
              <br />
              Ulubione
            </div>
          </div>
          <div className="userHistory__container__bottom">
            <ul>
              <li>Posiłek</li>
              <li>Posiłek</li>
              <li>Posiłek</li>
              <li>Posiłek</li>
              <li>Posiłek</li>
              <li>Posiłek</li>
            </ul>
          </div>
        </>
      )}

    </div>
  );
}
