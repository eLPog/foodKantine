import './FirstVisitPage.css';
import { Link, NavLink } from 'react-router-dom';

export function FirstVisitPage(props) {
  return (
    <section className="firstVisit__container">
      <h3>Welcome</h3>
      <p>
        this is your first visit to this website:
      </p>
      <ol className="firstVisit__container__list">
        <li>
          You must be logged in to order the products
        </li>
        <li>
          If you do not want to create a new account, please use the test account:
          <p className="firstVisit__container__list__loginData">
            <span>login:</span>
            test@test.com
            <br />
            <span>password:</span>
            password
          </p>
        </li>
        <li>
          <Link to="/aboutApp" onClick={props.closeModal} className="firstVisit__container__list__link">
            Click here for more information about app
          </Link>
        </li>
      </ol>
      <p>
        This website was made only for testing purposes. It is not used for ordering products or meals.
      </p>
      <button className="btn-primary" onClick={props.closeModal}>OK</button>
    </section>
  );
}
