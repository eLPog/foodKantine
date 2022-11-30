import './AllFoodList.css';
import { memo } from 'react';
import { OneFoodElement } from '../OneFoodElement/OneFoodElement';
import { mealInterface } from '../../../interfaces/allMealsInterface';

interface propsInterface{
  elements:mealInterface[],
  searchFoodByCategory:(category:string | boolean)=>{},
  addMealToOrder:()=>{},
  mealsFilter:string,
  category:string,
}
function AllFoodList(props:propsInterface) {
  return (
    <main className="container mainSection__container">
      <section className="row d-flex align-items-center  justify-content-center">
        <button className="btn-secondary food__searchButton--sale" onClick={() => { props.searchFoodByCategory('sale'); }}>
          <span>
            <strong>
              %
              Sale
            </strong>

          </span>
        </button>
        <button className="btn-secondary col-sm-4 food__searchButton" onClick={() => { props.searchFoodByCategory('breakfast'); }}>Breakfast</button>
        <button className="btn-secondary col-sm-4 food__searchButton" onClick={() => { props.searchFoodByCategory('lunch'); }}>Lunch</button>
        <button className="btn-secondary col-sm-4 food__searchButton" onClick={() => { props.searchFoodByCategory('dinner'); }}>Dinner</button>
        <button className="btn-secondary col-sm-4 food__searchButton" onClick={() => { props.searchFoodByCategory('dessert'); }}>Dessert</button>
        <button className="btn-secondary col-sm-4 food__searchButton" onClick={() => { props.searchFoodByCategory(false); }}>All</button>

      </section>
      <section className="row mt-3 d-flex justify-content-around allFoodList__container">
        <div className="allFoodList__container__filterApplied">
          <span className="allFoodList__container__filterApplied--element">
            Category/Searched word:
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
      </section>
      <div className="mainSection__container__footer">
        <a href="https://github.com/eLPog" target="_blank" rel="noreferrer">
          Created by
          eLPog
        </a>
        <a href="https://rockpaper.networkmanager.pl/" target="_blank" rel="noreferrer">RockPaper</a>
        <a href="https://tickitoff.networkmanager.pl/" target="_blank" rel="noreferrer">ToDoList</a>
        <p>
          2022
        </p>
      </div>
    </main>

  );
}
export default memo(AllFoodList);
