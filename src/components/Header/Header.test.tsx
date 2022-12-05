import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Header component', () => {
  test('Should have input field', () => {
    const { queryByRole, debug } = render(
      <BrowserRouter>
        <Header searchDish={() => {}} />
      </BrowserRouter>,
    );
    const input = queryByRole('textbox');
    expect(input).toBeTruthy();
    expect(input).toHaveAttribute('placeholder', 'Search...');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveClass('header__container__input');
  });
  test('Should change input value after provide letters ', () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <Header searchDish={() => {}} />
      </BrowserRouter>,
    );
    const input = queryByRole('textbox');
    expect(input).toBeTruthy();
    expect(input).toHaveValue('');
    fireEvent.change(input, { target: { value: 'testText' } });
    expect(input).toHaveValue('testText');
    fireEvent.change(input, { target: { value: 'another text' } });
    expect(input).toHaveValue('another text');
  });
  test('Should call search function after click on search button', () => {
    const mockFunction = jest.fn();
    const { queryByRole } = render(
      <BrowserRouter>
        <Header searchDish={mockFunction} />
      </BrowserRouter>,
    );
    const button = queryByRole('button');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('header__container--searchBtn');
    fireEvent.click(button);
    expect(mockFunction).toBeCalledTimes(1);
  });
});
