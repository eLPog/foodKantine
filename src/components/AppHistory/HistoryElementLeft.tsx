import { appHistory } from './AppHistory';

export function HistoryElementLeft(props:appHistory) {
  return (
    <>
      <div className="timelineComponent timelineComponent--bg">
        <h2 className="timelineComponent__version">{props.version}</h2>
        <p>{props.content}</p>
      </div>
      <div className="timelineMiddle">
        <div className="timelinePoint" />
      </div>
      <div className="timelineComponent">
        <div className="timelineDate">
          {props.date}
        </div>
      </div>
    </>
  );
}
