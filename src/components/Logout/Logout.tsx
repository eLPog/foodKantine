import './Logout.css';
import { useEffect } from 'react';
import { Loading } from '../Loading/Loading';

export function Logout(props:{logoutModalHandler:()=>void}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.logoutModalHandler();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="logout__container">
      <p>Thank you</p>
      You have been logged out
      <Loading />
    </div>
  );
}
