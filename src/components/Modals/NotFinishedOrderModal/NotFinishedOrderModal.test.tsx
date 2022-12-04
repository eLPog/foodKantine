import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { NotFinishedOrderModal } from './NotFinishedOrderModal';

describe('Info modal component ', () => {
  test('should show information about product in bucket', () => {
    const { queryByText } = render(
      <NotFinishedOrderModal closeModal={() => {}} />,
    );
    const info = queryByText('You have some products in shopping card');
    expect(info).toBeTruthy();
    expect(info.tagName.toLowerCase()).toBe('p');
    expect(info.parentElement.tagName.toLowerCase()).toBe('div');
  });
  test('should call close modal function after click on button', () => {
    const testFunction = jest.fn();
    const { queryByRole } = render(<NotFinishedOrderModal closeModal={testFunction} />);
    const button = queryByRole('button');
    fireEvent.click(button);
    expect(testFunction).toBeCalledTimes(1);
  });
});
