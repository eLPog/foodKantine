import './OneFoodElement.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

export function OneFoodElement(props) {
  const { isUserAuthenticated } = useContext(isAuthenticatedContext);
  return (
    <section className={`d-flex flex-sm-column col-sm-4 col-lg-3 oneFoodElement__container ${props.specialOffer && 'specialOffer__select'}`}>
      <div className="d-flex flex-sm-col
      flex-column justify-content-around oneFoodElement__container__card__description"
      >
        <div className="d-flex flex-column align-items-center">
          <h2 className="oneFoodElement__container__card__description__title">
            {props.name}
          </h2>
          <div className="text-center">
            <Link to={`/products/${props.dataID}`}>
              <button className="btn-primary">
                Details
              </button>
            </Link>
            {isUserAuthenticated ? (
              <button className="btn-primary" onClick={() => props.addMealToOrder(props.dataID)}>
                Buy
              </button>
            ) : (
              <Link to="/login">
                <button className="btn-primary">
                  Buy
                </button>
              </Link>
            )}

          </div>
        </div>
      </div>
      <Link to={`/products/${props.dataID}`}>
        <div className="oneFoodElement__container__card__photo">
          <img
            src={props.photo}
            alt="meal view"
          />
        </div>
      </Link>
    </section>
  );
}
