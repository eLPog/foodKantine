import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../utils/fetchMeals';

export function useGetAllMeals() {
  const navigate = useNavigate();
  const [allMeals, setAllMeals] = useState({ isLoading: true, allElements: [] });
  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts();
        setAllMeals({ isLoading: false, allElements: res['-NCAQYq_QqAk59rSL8Bq'] });
      } catch (err) {
        console.log(err);
        setAllMeals({ isLoading: false, allElements: [] });
        navigate('/error');
      }
    })();
  }, [setAllMeals]);
  return allMeals;
}
