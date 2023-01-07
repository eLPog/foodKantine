import './Slider.css';
import { useState } from 'react';
import { PhotoModal } from '../Modals/PhotoModal/PhotoModal';
import { Backdrop } from '../Modals/Backdrop/Backdrop';
import { photoObjectInterface } from '../CodeExamples/Code';

interface sliderProps {
  photos:photoObjectInterface[],
}
export function Slider(props:sliderProps) {
  const { photos } = props;
  const [showBigPhoto, setShowBigPhoto] = useState<boolean>(false);
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
  function mainPhotoKeyDownHandler(e:any) {
    if (e.key === 'Enter') {
      showBigPhotoHandler();
    }
  }
  function smallPhotoKeyDownHandler(e:any, index:number) {
    if (e.key === 'Enter') {
      setCurrentPhotoIndex(index);
    }
  }
  function showBigPhotoHandler() {
    showBigPhoto ? setShowBigPhoto(false) : setShowBigPhoto(true);
  }
  function selectPhotoFromMiniatures(index:number) {
    setCurrentPhotoIndex(index);
  }
  return (
    <>
      {showBigPhoto ? (
        <>
          <Backdrop />
          <PhotoModal photoPath={photos[currentPhotoIndex].path} description={photos[currentPhotoIndex].description} closeModal={showBigPhotoHandler} />
        </>
      ) : (
        <div className="container slider__container">
          <div className="slider">
            <div className="sliderBox" role="button" tabIndex={0} onKeyDown={mainPhotoKeyDownHandler} onClick={showBigPhotoHandler}>
              <img src={photos[currentPhotoIndex].path} alt="code" className="slider-img" />
              <section className="slider__description">
                {photos[currentPhotoIndex].shortDescription}
              </section>
            </div>
            <button className="slider__btn btn--left" onClick={movePhotoLeft}><span>&lt;</span></button>
            <button className="slider__btn btn--right" onClick={movePhotoRight}><span>&gt;</span></button>
          </div>
          <div className="slider__container__miniatures">
            {photos.map((el:photoObjectInterface, i:number) => {
              let activePhoto = false;
              if (i === currentPhotoIndex) {
                activePhoto = true;
              }
              return (
              // eslint-disable-next-line no-restricted-globals
                <section role="button" className="slider__container__miniatures__photoContainer" tabIndex={0} onKeyDown={() => { smallPhotoKeyDownHandler(event, i); }} onClick={() => selectPhotoFromMiniatures(i)} key={Math.random() * 100}>
                  <img src={el.path} alt="code" className={`slider__container__miniatures__photo ${activePhoto ? 'activePhoto' : ''}`} />
                </section>
              );
            })}
          </div>
        </div>
      )}

    </>
  );
}
