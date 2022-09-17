import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../../assets/db/db';

export function DetailsFoodElement() {
  const { dataID } = useParams();
  const [element, setElement] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const findElement = db.find((el) => el.dataID === dataID);
    setElement(findElement);
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? <p>Loading</p> : element.name}
    </>
  );
}
