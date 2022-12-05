import './AppHistory.css';
import { Link } from 'react-router-dom';
import { HistoryElementRight } from './HistoryElementRight';
import { HistoryElementLeft } from './HistoryElementLeft';

export interface appHistory {
    version:string,
    content:string,
    date:string
}
export function AppHistory() {
  return (
    <div className="container timeline__container">
      <div className="timeline" data-testid="timelineContainer">
        <HistoryElementRight
          date="September 2022"
          version="version 1.0.0"
          content="The first version of the application. It allowed the user registration and ordering meals. User can see orders history."
        />
        <HistoryElementLeft
          version="version 1.0.1"
          date="September 2022"
          content="The user can change the password, email and delete the account."
        />
        <HistoryElementRight
          date="October 2022"
          version="version 1.0.2"
          content="The ability to log into a test account. Remembering the basket when an order is not finalized."
        />
        <HistoryElementLeft
          date="November 2022"
          version="version 1.0.3"
          content="User can now repeat the order from the orders history list"
        />
      </div>
      <div className="button__bottom">
        <Link to="/">
          <button className="btn-primary">Home</button>
        </Link>
      </div>
    </div>
  );
}
