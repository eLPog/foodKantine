import './RegisterProgress.css';
import { useEffect, useState } from 'react';
import { validationEmail } from '../../../utils/validationEmail';

interface propsInterface {
    email:string,
    password1:string,
    password2:string,
    isButtonActive:boolean
}

export function RegisterProgress(props:propsInterface) {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPass1Valid, setIsPass1Valid] = useState<boolean>(false);
  const [isPass2Valid, setIsPass2Valid] = useState<boolean>(false);
  useEffect(() => {
    if (validationEmail(props.email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }, [props.email]);
  useEffect(() => {
    if (props.password1.trim().length > 5) {
      setIsPass1Valid(true);
    } else {
      setIsPass1Valid(false);
    }
    if (props.password2.trim().length > 5 && props.password1 === props.password2) {
      setIsPass2Valid(true);
    } else {
      setIsPass2Valid(false);
    }
  }, [props.password1, props.password2]);

  return (
    <div className="container">
      <div className="registerProgress__container">
        <div className={`registerProgress__container__section --email ${props.email ? 'incorrect' : ''} ${isEmailValid ? 'correct' : ''}`}>Email</div>
        <div className={`registerProgress__container__section --password1 ${props.password1 ? 'incorrect' : ''} ${isPass1Valid ? 'correct' : ''}`}>Password</div>
        <div className={`registerProgress__container__section --password2 ${props.password2 ? 'incorrect' : ''} ${isPass2Valid ? 'correct' : ''}`}>Repeat password</div>
      </div>
    </div>
  );
}
// @TODO zrobić osobną funkcję walidowania rejestracji - poprawność email, czy hasło ma min 6 znaków
