import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './DetailsFoodElement.css';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { mealInterface } from '../../../interfaces/mealInterface';
import { routes } from '../../../routes/routes';

interface propsInterface {
    db:mealInterface[],
    addMealToOrder:(mealID: string | undefined)=>void
}
export function DetailsFoodElement(props:propsInterface) {
  const { isUserAuthenticated } = useContext(isAuthenticatedContext);
  const navigate = useNavigate();
  function handleClick() {
    navigate(-1);
  }
  const { dataID } = useParams();
  const [element, setElement] = useState<mealInterface|undefined>();
  useEffect(() => {
    const thisElement:mealInterface | undefined = props.db.find((el) => el.dataID === dataID);
    setElement(thisElement);
  }, []);
  const specialOffer = (
    <div className="specialOffer__container d-flex flex-column align-items-center justify-content-center gap-lg-3">
      <h2 className="specialOffer__container__title fs-1 fs-sm-4"> Special Offer!!!</h2>
      <span className="specialOffer__container__discount">Only now -20%</span>

    </div>
  );
  const specialOfferPrice = (
    <div className="d-flex justify-content-center m-2 price__description__sum">
      <span className="oldPrice">
        {element?.price}
        $
      </span>
      <span className="newPrice">
        {element && (element.price * 0.8).toFixed(2)}

        $
      </span>
    </div>
  );
  return (
    <div className={`container detailsFoodElement__card ${element?.specialOffer && 'specialBackground'}`}>
      <h1>{element?.name}</h1>
      <div className="d-flex flex-column align-items-center justify-content-around flex-sm-row">
        <img className="oneFoodElement__card__photo m-sm-2" src={element?.photo} alt="food description" />
        <div className="d-flex flex-column justify-content-around align-items-center gap-2 gap-sm-3 detailsFoodElement__container">
          <div className="detailsFoodElement__card__price__container mb-sm-2">
            <div className="price__description">
              Price:
            </div>
            {!element?.specialOffer ? (
              <div className="fs-1">
                {element?.price}
                $
              </div>
            ) : specialOfferPrice}

          </div>
          <h2 className="detailsFoodElement__card__price__container__description">{element?.description}</h2>
          {element?.specialOffer && specialOffer}
        </div>
      </div>
      {isUserAuthenticated ? (
        <button className="btn-primary" onClick={() => props.addMealToOrder(dataID)}>
          Add
        </button>
      ) : (
        <Link to={routes.login}>
          <button className="btn-primary">
            Add
          </button>
        </Link>
      )}
      <button className="btn-primary btn__back" onClick={handleClick}>
        Back
      </button>
    </div>
  );
}
