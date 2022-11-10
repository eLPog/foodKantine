import { firebaseURL } from '../assets/db/firebaseurl';

export async function getProducts() {
  try {
    const data = await fetch(`${firebaseURL}.json`);
    return await data.json();
  } catch (err) {
    console.log(err);
  }
}
