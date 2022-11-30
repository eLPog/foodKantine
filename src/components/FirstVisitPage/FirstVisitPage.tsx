import './FirstVisitPage.css';
import { Link } from 'react-router-dom';

export function FirstVisitPage(props:{closeModal:()=>{}}) {
  return (
    <section className="firstVisit__container">
      <h3>Welcome</h3>
      <p>
        this is your first visit so i will give you some tips:
      </p>
      <ol className="firstVisit__container__list">
        <li>
          You must be logged to order the products
        </li>
        <li>
          If you dont want create a new account, please use the test account:
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
      <button className="btn-primary --confirmOK" onClick={props.closeModal}>OK</button>
    </section>
  );
}
