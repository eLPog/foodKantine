import { Link } from 'react-router-dom';
import './RandomFoodElement.css';

export function RandomFoodElement(props) {
  const { randomElement } = props;
  const shortDescription = randomElement.description.split(' ').slice(0, 30).join(' ');
  return (
    <div className="container randomFoodElement__container mx-0">
      <div className="randomFoodElement__container__title">
        This may interest you
      </div>
      <div className="randomFoodElement__container__description">
        <div className="d-flex justify-content-around ">
          <p className="randomFoodElement__container__container__description__shortDescription">
            {shortDescription}
            ...
          </p>
        </div>
        <div className="card-footer text-center">
          <Link to={`/${randomElement.dataID}`}>
            <button className="btn-primary btn-readMore">
              Read more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
