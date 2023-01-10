import React from 'react';
import { render } from '@testing-library/react';
import { OrderSummaryModal } from './OrderSummaryModal';

describe('Order Summary Modal', () => {
  test('Should show information about order', () => {
    const { queryByText } = render(
      <OrderSummaryModal />,
    );
    const text = queryByText('The order has been sent successfully.');
    expect(text).toBeTruthy();
    expect(text.tagName.toLowerCase()).toBe('p');
    expect(text.parentElement.tagName.toLowerCase()).toBe('section');
    expect(text.parentElement).toHaveClass('order__thanks');
  });
});
