import { useCallback, useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { firebaseURL } from '../../assets/db/firebaseurl';
import './Order.css';
import { getActuallyDate } from '../../utils/getActuallyDate';
import { Loading } from '../Loading/Loading';

export function Order(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    props.orderCart.forEach((el) => price += el.price * el.quantity);
    price = price.toFixed(2);
    setTotalPrice(Number(price));
  }, [props.orderCart]);
  const completeOrder = {
    userID: props.userID,
    date: getActuallyDate(),
    meals: props.orderCart,
    totalPrice,
  };
  async function sendOrder() {
    setIsLoading(true);
    try {
      await fetch(`${firebaseURL}orders.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeOrder),
      });
      setIsLoading(false);
      props.clearOrder();
      localStorage.setItem('oldOrder', JSON.stringify([]));
      setShowSummaryModal(true);
      setTimeout(() => {
        setShowSummaryModal(false);
        navigate('/');
      }, 3000);
    } catch (err) {
      console.log(err);
      navigate('/error');
    }
  }
  return (
    <section className="container order__container">
      {showSummaryModal ? (
        <section className="order__thanks">
          <p> The order has been sent successfully. </p>
          <p> You will return to the home page in a moment</p>
        </section>
      ) : (
        <>
          {isLoading ? <Loading /> : (
            <>
              <div className="order__container__header">
                <span>Your order</span>
                <span>{getActuallyDate().slice(0, 10)}</span>
              </div>
              <ul className="container order__container__mealsList">
                {props.orderCart.map((el) => (
                  <li key={el.mealID} className="order__container__mealsList__oneMealCard">
                    <h4>{el.name}</h4>
                    <p>
                      <span className="order__container__mealsList__oneMealCard--element">Price:</span>
                      {el.price.toFixed(2)}
                    </p>
                    <p>
                      <span className="order__container__mealsList__oneMealCard--element">Quantity:</span>
                      {el.quantity}
                    </p>
                    <button className="btn-primary --confirmDELETE" onClick={() => props.removeMeal(el.mealID)}>Remove</button>
                  </li>
                ))}
              </ul>

              <div className="order__container__summary">
                {props.orderCart.length < 1 ? (
                  <>
                    <span className="order__container__summary--element">List is empty</span>
                    <NavLink to="/"><button className="btn-primary">Meals</button></NavLink>
                  </>
                ) : (
                  <>
                    <span className="order__container__summary--element">Total Price:</span>
                    {totalPrice}
                    $
                    <br />
                    <button className="btn-primary --confirmOK" onClick={sendOrder}>Buy</button>
                    <NavLink to="/">
                      <button className="btn-primary">Add more</button>
                    </NavLink>

                  </>
                )}

              </div>
            </>
          )}

        </>
      )}
    </section>
  );
}
