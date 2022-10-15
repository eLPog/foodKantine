import './AllFoodList.css';
import { memo } from 'react';
import { OneFoodElement } from '../OneFoodElement/OneFoodElement';

function AllFoodList(props) {
  return (
    <>
      <div className="container">
        <div className="d-flex flex-column align-items-center flex-sm-row justify-content-center">
          <button className="btn-secondary food__searchButton--sale" onClick={() => { props.searchFoodByCategory('sale'); }}>
            <span className="percentSign">
              %
              Sale
            </span>
          </button>
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory('breakfast'); }}>Breakfast</button>
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory('lunch'); }}>Lunch</button>
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory('dinner'); }}>Dinner</button>
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory('dessert'); }}>Dessert</button>
          <button className="btn-secondary food__searchButton" onClick={() => { props.searchFoodByCategory(false); }}>All</button>

        </div>
        <div className="row mt-3 d-flex justify-content-around allFoodList__container">
          <div className="allFoodList__container__filterApplied">
            <span className="allFoodList__container__filterApplied--element">
              Category:
            </span>
            {props.mealsFilter}
          </div>
          {props.elements.map((el) => (
            <OneFoodElement
              photo={el.photo}
              name={el.name}
              description={el.description}
              dataID={el.dataID}
              key={el.dataID}
              specialOffer={el.specialOffer}
              addMealToOrder={props.addMealToOrder}
            />
          ))}
        </div>
      </div>
    </>

  );
}
export default memo(AllFoodList);
