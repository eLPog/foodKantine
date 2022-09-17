import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function DetailsFoodElement(props) {
  const { dataID } = useParams();
  const [element, setElement] = useState({});
  useEffect(() => {
    const thisElement = props.db.find((el) => el.dataID === dataID);
    setElement(thisElement);
  }, []);
  return (
    <>
      <h1>{element.name}</h1>
      <h2>{element.description}</h2>
      {element.specialOffer && <h4>PROMOCJA</h4>}
      <img src={element.photo} alt="food description" />
    </>
  );
}
