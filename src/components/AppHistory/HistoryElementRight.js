export function HistoryElementRight(props) {
  return (
    <>
      <div className="timelineComponent">
        <div className="timelineDate timelineDate--right">
          {props.date}
        </div>
      </div>
      <div className="timelineMiddle">
        <div className="timelinePoint" />
      </div>
      <div className="timelineComponent timelineComponent--bg">
        <h2 className="timelineComponent__version">
          {props.version}
        </h2>
        <p>{props.content}</p>
      </div>
    </>
  );
}
