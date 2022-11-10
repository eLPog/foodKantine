import { firebaseLoginWithEmail } from '../assets/db/firebaseurl';

export async function loginTestUserFetch() {
  try {
    const data = await fetch(firebaseLoginWithEmail, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email: 'test@test.com', password: 'password', returnSecureToken: true }),
    });
    return await data.json();
  } catch (err) {
    console.log(err);
  }
}
