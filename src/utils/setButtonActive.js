export function setButtonActive(email, password) {
  return (email.trim().length > 1 && email.includes('@') && password.trim().length > 4);
}
