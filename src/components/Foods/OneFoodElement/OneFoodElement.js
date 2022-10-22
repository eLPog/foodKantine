import './OneFoodElement.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
// @TODO wyświetlić info, że aby zamówić to trzeba się zalogować
export function OneFoodElement(props) {
  const { isUserAuthenticated } = useContext(isAuthenticatedContext);
  const { needToLoginInfo, setNeedToLoginInfo } = useState('');
  const navigate = useNavigate();

  return (
    <div className={`d-flex flex-sm-column col-sm-4 col-lg-3 oneFoodElement__container ${props.specialOffer && 'specialOffer__select'}`}>
      <div className="d-flex flex-sm-col
      flex-column justify-content-around oneFoodElement__container__card__description"
      >
        <div className="d-flex flex-column align-items-center">
          <p className="oneFoodElement__container__card__description__title">
            {props.name}
          </p>
          <div className="text-center">
            <Link to={`/products/${props.dataID}`}>
              <button className="btn-primary">
                Details
              </button>
            </Link>
            <button className="btn-primary" onClick={() => props.addMealToOrder(props.dataID)}>
              Buy
            </button>
          </div>
        </div>
      </div>
      <Link to={`/${props.dataID}`}>
        <div className="oneFoodElement__container__card__photo">
          <img
            src={props.photo}
            alt="meal view"
          />
        </div>
      </Link>
    </div>
  );
}
