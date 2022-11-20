import { firebaseURL } from '../assets/db/firebaseurl';

export async function sendNewOrder(orderObj) {
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
