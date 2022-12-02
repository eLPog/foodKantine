export function setButtonActive(email:string, password:string) :boolean {
  return (email.trim().length > 1 && email.includes('@') && password.trim().length > 4);
}
