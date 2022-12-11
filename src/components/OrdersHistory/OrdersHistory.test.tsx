import React from 'react';
import {
  act, render, waitFor, screen,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { OrdersHistory } from './OrdersHistory';
import { useOrdersHistory } from '../../hooks/useOrdersHistory';

describe('Orders history component', () => {
  const orders = [{
    date: '20.11.2022 14:19:26',
    meals: [
      {
        mealID: 'testID1',
        name: 'testName1',
        price: 3,
        quantity: 1,
      },
    ],
    orderID: 'orderIdTest1',
    totalPrice: 3,
    userID: 'userIdTest',
  },
  {
    date: '11.05.2022 10:10:20',
    meals: [
      {
        mealID: 'testID2',
        name: 'testName2',
        price: 5,
        quantity: 1,
      },
      {
        mealID: 'testID3',
        name: 'testName3',
        price: 4.3,
        quantity: 1,
      },
    ],
    orderID: 'orderIdTest2',
    totalPrice: 9.3,
    userID: 'userIdTest',
  },
  ];
  test('should show summary of all orders', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(orders),
    }));
    act(() => {
      render(
        <BrowserRouter>
          <OrdersHistory />
        </BrowserRouter>,
      );
    });

    const div = await waitFor(() => screen.getByTestId('test123'));
  });
});
