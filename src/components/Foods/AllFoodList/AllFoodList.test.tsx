import React from 'react';
import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AllFoodList from './AllFoodList';
import { ErrorPage } from '../../ErrorPage/ErrorPage';

// global.fetch = require('jest-fetch-mock');

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
    });
  });
  test('should render error page component if promise is rejected', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.reject());
    act(() => {
      render(
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>,
      );
    });

    await waitFor(() => {
      const div = screen.getByTestId('errorPageContainer');
      expect(div).toBeTruthy();
      expect(div).toHaveClass('errorPage__container');
    });
  });
});
