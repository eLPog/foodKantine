import './PhotoModal.css';

interface PhotoModalInterface {
    photoPath:string,
    closeModal:()=>void;
}
export function PhotoModal(props:PhotoModalInterface) {
  return (
    <div className="photoModal__container">
      <div className="photoModal__container__main">
        <img src={props.photoPath} alt="code example" className="photoModal__container__main__img" />
        <button onClick={props.closeModal} className="photoModal__container__main__button">Close</button>
      </div>
    </div>
  );
}
