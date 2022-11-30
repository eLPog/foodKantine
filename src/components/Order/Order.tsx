import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useNavigate, NavLink } from 'react-router-dom';
import './Order.css';
import { getActuallyDate } from '../../utils/getActuallyDate';
import { Loading } from '../Loading/Loading';
import { sendNewOrder } from '../../utils/sendOrder';
import { OrderSummaryModal } from '../elements/OrderSummaryModal/OrderSummaryModal';
import { isAuthenticatedContext } from '../../context/isAuthenticatedContext';
import { orderObjectInterface } from '../../interfaces/orderObjectInterface';

interface propsInterface {
  orderCart:{mealID:string,
  name:string, price:number, quantity:number}[],
  removeMeal:(mealID:string)=>{},
  clearOrder:()=>{},
}
export function Order(props:propsInterface) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userState } = useContext(isAuthenticatedContext);
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    props.orderCart.forEach((el) => price += el.price * el.quantity);
    price = Number(price.toFixed(2));
    setTotalPrice(Number(price));
  }, [props.orderCart]);
  const completeOrder:orderObjectInterface = {
    userID: userState.localId,
    date: getActuallyDate(),
    meals: props.orderCart,
    totalPrice,
    orderID: v4(),
  };
  async function sendOrder() {
    setIsLoading(true);
    try {
      await sendNewOrder(completeOrder);
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
      {showSummaryModal ? <OrderSummaryModal /> : (
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
