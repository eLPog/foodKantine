import { useEffect, useState } from 'react';
import { firebaseURL } from '../../assets/db/firebaseurl';

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
    <div className="container">
      <div className="order__container">
        <div className="order__container__mealsList">
          <ul>
            {props.orderCart.map((el) => (
              <li key={el.mealID}>
                <h4>{el.name}</h4>
                <p>{el.price}</p>
                <p>{el.date}</p>
              </li>
            ))}
          </ul>
          <button onClick={sendTestData}>Dodaj</button>
        </div>
        <div className="order__container__sumary">
          Total Price:
          {totalPrice}
          $
        </div>
      </div>
    </div>
  );
}
