import { useState } from 'react';
import './UserHistory.css';

// pobrać https://foodkantine-a6214-default-rtdb.europe-west1.firebasedatabase.app/orders
export function UserHistory() {
  const [allUsersMeals, setAllUsersMeals] = useState([]);
  const getAllUsersOrders = async () => {
    const data = await fetch('https://foodkantine-a6214-default-rtdb.europe-west1.firebasedatabase.app/orders.json');
    const res = await data.json();
    console.log(res);
  };
  return (
    <div className="container userHistory__container">
      <div className="userHistory__container__top">
        <div className="userHistory__container__lastOrders">
          <ul>
            Ostatnio zamówione
            <li>Posiłek 1</li>
            <li>Posiłek 2</li>
            <li>Posiłek 3</li>
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
    </div>
  );
}
