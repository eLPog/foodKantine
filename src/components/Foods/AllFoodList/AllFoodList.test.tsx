import React from 'react';
import {
  act, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AllFoodList from './AllFoodList';
import { Main } from '../../Main/Main';

const meals = [
  {
    category: 'breakfast',
    dataID: '123',
    description: 'test meal',
    name: 'meal1',
    photo: 'some path',
    price: 10,
    specialOffer: false,
  },
];
describe('AllFoodList component', () => {
  test('should render OneFoodElement component after response from API', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));
    act(() => {
      render(
        <BrowserRouter>
          <AllFoodList elements={meals} searchFoodByCategory={() => {}} addMealToOrder={() => {}} mealsFilter="sale" />
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const div = screen.getByTestId('allFoodsContainerTest');
      expect(div).toBeTruthy();
      expect(div).toHaveClass('oneFoodElement__container');
      expect(div.tagName.toLowerCase()).toBe('section');
    });
  });
  test('should trigger filter function after click on categories buttons', () => {
    const testFunction = jest.fn();
    const { queryAllByRole } = render(
      <BrowserRouter>
        <AllFoodList elements={meals} searchFoodByCategory={testFunction} addMealToOrder={() => {}} mealsFilter="sale" />
      </BrowserRouter>,
    );
    // @ts-ignore only to use regexp
    const categoryButtons = queryAllByRole('button').filter((el) => el.className === /food/i || el.className === /sale/);
    (async () => {
      await categoryButtons.forEach((el) => {
        fireEvent.click(el);
      });
    })();
    expect(testFunction).toBeCalledTimes(categoryButtons.length);
  });

  // should be moved to main component
  test('should render error page component if promise is rejected', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.reject());
    act(() => {
      render(
        <BrowserRouter>
          <Main />
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const div = screen.getByTestId('errorPageContainer');
      expect(div).toBeTruthy();
      expect(div).toHaveClass('errorPage__container');
    });
  });
  test('should show links to another pages in footer', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <AllFoodList elements={meals} searchFoodByCategory={() => {}} addMealToOrder={() => {}} mealsFilter="sale" />
      </BrowserRouter>,
    );
    const footerContainer = queryByTestId('footerTest');
    const links = footerContainer.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
      expect(links[i]).toHaveAttribute('href');
      expect(links[i]).toHaveAttribute('target');
    }
  });
});
