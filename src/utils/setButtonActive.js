export function setButtonActive(email, password, confirmedPassword) {
  if (!confirmedPassword) {
    return (email.trim().length > 1 && email.includes('@') && password.trim().length > 4);
  }
  return (email.trim().length > 1 && email.includes('@') && password.trim().length > 4 && password === confirmedPassword);
}
