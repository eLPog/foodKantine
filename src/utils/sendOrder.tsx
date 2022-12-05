import { firebaseURL } from '../assets/db/firebaseurl';
import { orderObjectInterface } from '../interfaces/orderObjectInterface';

export async function sendNewOrder(orderObj:orderObjectInterface) {
  try {
    await fetch(`${firebaseURL}orders.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderObj),
    });
  } catch (err) {
    console.log(err);
  }
}
