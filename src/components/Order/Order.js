import { useEffect, useState } from 'react';
import { firebaseURL } from '../../assets/db/firebaseurl';
import './Order.css';

export function Order(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let price = 0;
    props.orderCart.forEach((el) => price += el.price);
    price = price.toFixed(2);
    setTotalPrice(price);
  }, [props.orderCart]);
  const dataToFetch = {
    userID: props.userID,
    meals: props.orderCart,
  };
  async function sendTestData() {
    await fetch(`${firebaseURL}orders.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToFetch),
    });
  }
  return (
    <div className="container order__container">
      <div className="order__container__header">
        <span>Order List</span>
        <span>22.10.2022</span>
      </div>
      <div className="order__container__mealsList">
        <ul>
          {props.orderCart.map((el) => (
            <li key={el.mealID} className="order__container__mealsList__oneMealCard">
              <h4>{el.name}</h4>
              <p>{el.price}</p>
              <p>{el.quantity}</p>
              <button className="btn-primary" onClick={() => props.removeMeal(el.mealID)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="order__container__sumary">
        <button className="btn-primary" onClick={sendTestData}>Buy</button>
        Total Price:
        {totalPrice}
        $
      </div>
    </div>
  );
}
// @TODO jak są dwa takie same i zrobimy remove to usuwa obydwa.
