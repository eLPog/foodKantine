export function setButtonActive(email, password) {
  if (password) {
    return (email.trim().length > 1 && email.includes('@') && password.trim().length > 4);
  }
  return email.trim().length > 1 && email.includes('@') && email.includes('.');
}
