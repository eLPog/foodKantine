import './AllFoodList.css';
import { memo } from 'react';
import { OneFoodElement } from '../OneFoodElement/OneFoodElement';
import { RandomFoodElement } from '../RandomFoodElement/RandomFoodElement';

function AllFoodList(props) {
  return (
    <>
      <div className="container">
        {/* <RandomFoodElement randomElement={props.randomElement} /> */}
        <div className="d-flex flex-column align-items-center flex-sm-row justify-content-center">
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory('breakfast'); }}>Breakfast</button>
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory('lunch'); }}>Lunch</button>
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory('dinner'); }}>Dinner</button>
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory('dessert'); }}>Dessert</button>
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory(false); }}>All</button>

        </div>
        <div className="row mt-3 d-flex justify-content-around allFoodList__container">
          {props.elements.map((el) => (
            <OneFoodElement
              photo={el.photo}
              name={el.name}
              description={el.description}
              dataID={el.dataID}
              key={el.dataID}
            />
          ))}
        </div>
      </div>
    </>

  );
}
export default memo(AllFoodList);
