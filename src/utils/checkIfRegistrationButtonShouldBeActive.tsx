import { validationEmail } from './validationEmail';

export function checkIfRegistrationButtonShouldBeActive(email:string, password:string) :boolean {
  return (validationEmail(email) && password.trim().length > 5);
}
