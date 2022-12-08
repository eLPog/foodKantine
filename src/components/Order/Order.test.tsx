import React from 'react';
import {
  act, fireEvent, getByRole, getByTestId, render, waitFor, screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Order } from './Order';

describe('Order component', () => {
  const orderedMeals = [{
    mealID: '123', name: 'PizzaTest', price: 222, quantity: 1,
  }, {
    mealID: '543', name: 'HamburgerTest', price: 50, quantity: 1,
  }];
  test('should show information about empty list if order list is empty', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <Order orderCart={[]} removeMeal={() => {}} clearOrder={() => {}} />
      </BrowserRouter>,
    );
    const info = queryByText('List is empty');
    expect(info).toBeTruthy();
    expect(info.tagName.toLowerCase()).toBe('span');
    expect(info).toHaveClass('order__container__summary--element');
  });
  test('should render only one button, with link to meals list if order list is empty', () => {
    const { queryByRole, queryAllByRole } = render(
      <BrowserRouter>
        <Order orderCart={[]} removeMeal={() => {}} clearOrder={() => {}} />
      </BrowserRouter>,
    );
    const link = queryByRole('link');
    expect(link).toHaveAttribute('href', '/');
    const buttons = queryAllByRole('button');
    expect(buttons).toHaveLength(1);
    const linkButton = buttons[0];
    expect(linkButton).toBeTruthy();
    expect(linkButton).toHaveClass('btn-primary');
    expect(link.children).toContain(linkButton);
  });
  test('should render ordered list from props', () => {
    const { queryByRole, queryAllByRole, queryByText } = render(
      <BrowserRouter>
        <Order orderCart={orderedMeals} removeMeal={() => {}} clearOrder={() => {}} />
      </BrowserRouter>,
    );
    const listItems = queryAllByRole('listitem');
    expect(listItems).toBeTruthy();
    expect(listItems).toHaveLength(orderedMeals.length);
    const pizza = queryByText(orderedMeals[0].name);
    const hamburger = queryByText(orderedMeals[1].name);
    expect(pizza.tagName.toLowerCase() && hamburger.tagName.toLowerCase()).toBe('h4');
    (expect(pizza.parentElement)).toHaveClass('order__container__mealsList__oneMealCard');
  });
  test('should call remove function with correctly mealID', () => {
    const removeMealMock = jest.fn();
    const { queryAllByRole } = render(
      <BrowserRouter>
        <Order orderCart={orderedMeals} removeMeal={removeMealMock} clearOrder={() => {}} />
      </BrowserRouter>,
    );
    const [removeButton] = queryAllByRole('button', { name: 'Remove' });
    fireEvent.click(removeButton);
    expect(removeMealMock).lastCalledWith('123');
    expect(removeMealMock).not.lastCalledWith('543');
  });
});
