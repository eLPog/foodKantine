export const firebaseURL = 'https://foodkantine-a6214-default-rtdb.europe-west1.firebasedatabase.app/';
export const firebaseApiKey = 'AIzaSyBqwVUCZW31V7MPCmkKWbtjHe8sM_6H7uo';
export const firebaseAddUser = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`;
export const firebaseLoginWithEmail = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;
export const firebasePasswordReset = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`;
export const firebaseChangeEmail = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseApiKey}`;
