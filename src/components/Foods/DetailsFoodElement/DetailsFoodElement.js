import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DetailsFoodElement.css';

export function DetailsFoodElement(props) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(-1);
  }
  const { dataID } = useParams();
  const [element, setElement] = useState({});
  useEffect(() => {
    const thisElement = props.db.find((el) => el.dataID === dataID);
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
        {element.price}
        $
      </span>
      <span className="newPrice">
        {(element.price * 0.8).toFixed(2)}

        $
      </span>
    </div>
  );
  return (
    <div className="container detailsFoodElement__card">
      <h1>{element.name}</h1>
      <div className="d-flex flex-column align-items-center justify-content-around flex-sm-row">
        <img className="oneFoodElement__card__photo m-sm-2" src={element.photo} alt="food description" />
        <div className="d-flex flex-column justify-content-around align-items-center gap-2 gap-sm-3 detailsFoodElement__container">
          <div className="detailsFoodElement__card__price__container mb-sm-2">
            <div className="price__description">
              Price:
            </div>
            {!element.specialOffer ? (
              <div className="fs-1">
                {element.price}
                $
              </div>
            ) : specialOfferPrice}

          </div>
          <h2 className="detailsFoodElement__card__price__container__description">{element.description}</h2>
          {element.specialOffer && specialOffer}
        </div>
      </div>
      <button className="btn-primary btn__back" onClick={() => props.addMealToOrder(dataID)}>
        Buy
      </button>
      <button className="btn-primary btn__back" onClick={handleClick}>
        Back
      </button>
    </div>
  );
}
