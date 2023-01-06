import './Slider.css';
import { useState } from 'react';

interface sliderPorps {
  photos:string[]
}
export function Slider(props:sliderPorps) {
  const { photos } = props;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  function movePhotoRight() {
    setCurrentPhotoIndex((prevState) => prevState + 1);
    if (currentPhotoIndex === photos.length - 1) {
      setCurrentPhotoIndex(0);
    }
  }
  function movePhotoLeft() {
    setCurrentPhotoIndex((prevState) => prevState - 1);
    if (currentPhotoIndex === 0) {
      setCurrentPhotoIndex(photos.length - 1);
    }
  }
  return (
    <div className="slider__container">
      <div className="slider">
        <div className="sliderBox">
          <img src={photos[currentPhotoIndex]} alt="code" />
        </div>
        <button className="slider__btn btn--left" onClick={movePhotoLeft}><span>&lt;</span></button>
        <button className="slider__btn btn--right" onClick={movePhotoRight}><span>&gt;</span></button>
      </div>
      <div className="slider__container__miniatures">
        {photos.map((el:string, i:number) => {
          let activePhoto = false;
          if (i === currentPhotoIndex) {
            activePhoto = true;
          }
          return (
            <img src={el} alt="code" key={Math.random() * 100} className={`slider__container__miniatures__photo ${activePhoto ? 'activePhoto' : ''}`} />
          );
        })}
      </div>
    </div>
  );
}
