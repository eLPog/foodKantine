import './OneFoodElement.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

interface propsInterface {
    photo:string,
    name:string,
    description:string,
    dataID:string,
    key:string,
    specialOffer:boolean,
    addMealToOrder:(dataID:string)=>void
}
export function OneFoodElement(props :propsInterface) {
  const { isUserAuthenticated } = useContext(isAuthenticatedContext);
  return (
    <section className={`d-flex flex-sm-column col-sm-4 col-lg-3 oneFoodElement__container ${props.specialOffer && 'specialOffer__select'}`} data-testid="allFoodsContainerTest">
      <div
        className="d-flex flex-sm-col
      flex-column justify-content-around oneFoodElement__container__card__description"
      >
        <h2 className="oneFoodElement__container__card__description__title">
          {props.name}
        </h2>
        <section className="oneFoodElement__container__card__description--actions">
          <Link to={`/products/${props.dataID}`}>
            <button className="btn-primary">
              Details
            </button>
          </Link>
          {isUserAuthenticated ? (
            <button className="btn-primary" onClick={() => props.addMealToOrder(props.dataID)}>
              Add
            </button>
          ) : (
            <Link to="/login">
              <button className="btn-primary">
                Add
              </button>
            </Link>
          )}

        </section>

      </div>
      <Link to={`/products/${props.dataID}`}>
        <div className="oneFoodElement__container__card__photo">
          <img
            src={props.photo}
            alt="meal view"
            loading="lazy"
          />
        </div>
      </Link>
    </section>
  );
}
