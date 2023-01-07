import { Slider } from '../Slider/Slider';
// zrobić obiekt z adresemURL string, shortDescription i description, i to ma być w tabeli jako zdjęcia (całe obiekty zdjęcia)
export interface photoObjectInterface {
  path:string,
  shortDescription:string,
  description:string
}
const photo1:photoObjectInterface = {
  path: 'https://foodorder.networkmanager.pl/img/codeExamples/1.jpg',
  shortDescription: 'Check if unfinished order exist',
  description: 'Get item from localStorage to check if unfinished order exist. If exist, add all products to order list. If not, set in localStorage empty array on oldOrder field',
};
const photo2:photoObjectInterface = {
  path: 'https://foodorder.networkmanager.pl/img/codeExamples/3.jpg',
  shortDescription: 'App context',
  description: 'App Context include information if user is authenticated and a object with infos about user - email, localId and idToken, what is nesesery to check authentication on backend side.',
};
const photo3:photoObjectInterface = {
  path: 'https://foodorder.networkmanager.pl/img/codeExamples/4.jpg',
  shortDescription: 'Custom hook to fetch all meals',
  description: 'Custom hook to fetch all meals. If Promise is positiv resolved set all meals in array. If not, set empty array and navigate user to the error page with error information.',
};
const photo4:photoObjectInterface = {
  path: 'https://foodorder.networkmanager.pl/img/codeExamples/5.jpg',
  shortDescription: 'Button Go To Top',
  description: 'Button, after click, send user to the top of page. It is visible only after exceeding a certain page scrolling distance. ',
};
const photos = [photo1, photo2, photo3, photo4];
export function CodeExamples() {
  return (
    <Slider photos={photos} />
  );
}
