import React from 'react';
import { render } from '@testing-library/react';
import { Logout } from './Logout';

describe('Logout component', () => {
  test('should call logout function after 5 sek', () => {
    jest.useRealTimers();
    jest.spyOn(global, 'setTimeout');
    const fakeFunction = jest.fn();
    render(<Logout logoutModalHandler={fakeFunction} />);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).not.toHaveBeenLastCalledWith(expect.any(Function), 4999);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });
  test('should show "Thank You" information', () => {
    const { queryByText } = render(<Logout logoutModalHandler={() => {}} />);
    const thankYou = queryByText('Thank you');
    expect(thankYou).toBeTruthy();
    expect(thankYou.tagName.toLowerCase()).toBe('p');
    expect(thankYou.parentElement.tagName.toLowerCase()).toBe('div');
    expect(thankYou.parentElement).toHaveClass('logout__container');
  });
});
