import './OneFoodElement.css';
import { Link, useParams } from 'react-router-dom';

export function OneFoodElement(props) {
  console.log(props.dataID);
  return (
    <div className="d-flex flex-sm-column col-sm-4 col-lg-3 oneFoodElement__container">
      <div className=" d-flex flex-sm-col
      flex-column justify-content-around oneFoodElement__container__card__description"
      >
        <div className="d-flex flex-column align-items-center">
          <p className="">{props.name}</p>
          <div className="text-center">
            <Link to={`/${props.dataID}`}>
              <button className="btn-primary">
                Details
              </button>

            </Link>

          </div>
        </div>
      </div>
      <div className="oneFoodElement__container__card__photo">
        <img
          src={props.photo}
          alt="meal view"
        />
      </div>
    </div>
  );
}
