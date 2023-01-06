import './Slider.css';
import { useState } from 'react';

const photo1 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner1.jpg';
const photo2 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner2.jpg';
const photo3 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner3.jpg';
const photo4 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner4.jpg';
const photo5 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner5.jpg';
const photos = [photo1, photo2, photo3, photo4, photo5];
export function Slider() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
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
        {photos.map((el, i) => {
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
