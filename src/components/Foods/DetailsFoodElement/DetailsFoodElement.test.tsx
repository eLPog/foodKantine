import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  Routes, Route, MemoryRouter, BrowserRouter,
} from 'react-router-dom';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';
import { DetailsFoodElement } from './DetailsFoodElement';

const meals = [
  {
    category: 'breakfast',
    dataID: '123',
    description: 'test meal',
    name: 'meal1test',
    photo: 'someImagePath',
    price: 25,
    specialOffer: false,
  },
];

describe('Details food element component ', () => {
  const mockContext = {
    isUserAuthenticated: true,
    userState: {
      userEmail: '',
      idToken: '',
      localId: '',
    },
    userLoginHandler: () => {},
  };
  test('should show correctly data from product, after find it by dataId parameter, getting it from useParams', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({ state: { dataID: '123' } }),
    }));
    const { queryByText, queryByRole } = render(
      <MemoryRouter
        initialEntries={[
          '/products/123',
        ]}
      >
        <Routes>
          <Route path="/products/:dataID" element={<DetailsFoodElement db={meals} addMealToOrder={() => {}} />} />
        </Routes>
      </MemoryRouter>,

    );
    const price = queryByText('25$');
    expect(price).toBeTruthy();
    expect(price.tagName.toLowerCase()).toBe('div');
    expect(price).toHaveClass('fs-1');
    const mealName = queryByText('meal1test');
    expect(mealName).toBeTruthy();
    expect(mealName.tagName.toLowerCase()).toBe('h1');
    const image = queryByRole('img');
    expect(image).toHaveAttribute('src', 'someImagePath');
  });
  test('should call function after click ADD button', async () => {
    const addMealTestFunction = jest.fn();
    const { queryAllByRole } = render(
      <BrowserRouter>
        <isAuthenticatedContext.Provider value={mockContext}>
          <DetailsFoodElement db={meals} addMealToOrder={addMealTestFunction} />
        </isAuthenticatedContext.Provider>
      </BrowserRouter>,
    );
    const allButtons = queryAllByRole('button');
    expect(allButtons).toHaveLength(2);
    const addMealToOrderButton = allButtons[0];
    expect(addMealToOrderButton).not.toHaveClass('btn__back');
    fireEvent.click(addMealToOrderButton);
    expect(addMealTestFunction).toHaveBeenCalledTimes(1);
  });
  test('if user is logged, component should not show any links', () => {
    const { queryAllByRole } = render(
      <BrowserRouter>
        <isAuthenticatedContext.Provider value={mockContext}>
          <DetailsFoodElement db={meals} addMealToOrder={() => {}} />
        </isAuthenticatedContext.Provider>
      </BrowserRouter>,
    );
    const allLinks = queryAllByRole('link');
    expect(allLinks).toHaveLength(0);
  });
  test('if user is not logged, component should show link to login page', () => {
    const mockContext = {
      isUserAuthenticated: false,
      userState: {
        userEmail: '',
        idToken: '',
        localId: '',
      },
      userLoginHandler: () => {},
    };
    const { queryAllByRole } = render(
      <BrowserRouter>
        <isAuthenticatedContext.Provider value={mockContext}>
          <DetailsFoodElement db={meals} addMealToOrder={() => {}} />
        </isAuthenticatedContext.Provider>
      </BrowserRouter>,
    );
    const allLinks = queryAllByRole('link');
    expect(allLinks[0]).toHaveAttribute('href', '/login');
    expect(allLinks[0]).toHaveTextContent('Add');
  });
});
