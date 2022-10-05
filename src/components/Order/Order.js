import { firebaseURL } from '../../assets/db/firebaseurl';

export function Order(props) {
  console.log(props.orderBucket);
  const dataToFetch = {
    userID: 123,
    orders: [
      { orderID: 1, price: 33, date: 10102022 },
    ],
    favorites: [
      'meelID1', 'meelID2',
    ],
  };
  async function sendTestData() {
    const data = await fetch(`${firebaseURL}orders.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToFetch),
    });
    const res = await data.json();
    console.log(res);
  }
  return (
    <div className="container">
      <div className="order__container">
        <div className="order__container__mealsList">
          <ul>
            {props.orderBucket.map((el) => (
              <li key={el.mealID}>
                {el.mealID}
                ,
                {el.name}
                ,
                , data:
                {el.date}
              </li>
            ))}
          </ul>
        </div>
        <div className="order__container__sumary">
          Price:43$
        </div>
      </div>
    </div>
  );
}
