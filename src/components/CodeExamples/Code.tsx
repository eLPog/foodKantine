import { Slider } from '../Slider/Slider';

const photo1 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner1.jpg';
const photo2 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner2.jpg';
const photo3 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner3.jpg';
const photo4 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner4.jpg';
const photo5 = 'https://www.moviestudio.networkmanager.pl/img/Foods/dinner5.jpg';
const photos = [photo1, photo2, photo3, photo4, photo5];
export function CodeExamples() {
  return (
    <Slider photos={photos} />
  );
}
