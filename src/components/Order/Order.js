import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { firebaseURL } from '../../assets/db/firebaseurl';
import './Order.css';
import { getActuallyDate } from '../../utils/getActuallyDate';

export function Order(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let price = 0;
    props.orderCart.forEach((el) => price += el.price);
    price = price.toFixed(2);
    setTotalPrice(Number(price));
  }, [props.orderCart]);
  const completeOrder = {
    userID: props.userID,
    date: getActuallyDate(),
    meals: props.orderCart,
  };
  async function sendOrder() {
    try {
      await fetch(`${firebaseURL}orders.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeOrder),
      });
      props.clearOrder();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
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
              <p>{el.price.toFixed(2)}</p>
              <p>{el.quantity}</p>
              <button className="btn-primary" onClick={() => props.removeMeal(el.mealID)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="order__container__sumary">
        {props.orderCart.length < 1 ? (
          <>
            <p>List is empty</p>
            <NavLink to="/"><button className="btn-primary">Meals</button></NavLink>
          </>
        ) : (
          <>
            <button className="btn-primary" onClick={sendOrder}>Buy</button>
            Total Price:
            {totalPrice}
            $
          </>
        )}

      </div>
    </div>
  );
}
