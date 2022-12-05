import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FirstVisitPage } from './FirstVisitPage';
import { AboutApp } from '../AboutApp/AboutApp';

describe('First visit page', () => {
  const closeModal = jest.fn();
  test('should show Welcome in h3 tag', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <FirstVisitPage closeModal={() => {}} />
      </BrowserRouter>,
    );
    const welcomeText = queryByText('Welcome');
    expect(welcomeText).toBeTruthy();
    expect(welcomeText.tagName.toLowerCase()).toBe('h3');
  });
  test('should have one button with closeModal function ', () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <FirstVisitPage closeModal={closeModal} />
      </BrowserRouter>,
    );
    const closeModalButton = queryByRole('button');
    expect(closeModalButton).toBeTruthy();
    expect(closeModalButton).toHaveClass('btn-primary --confirmOK');
    fireEvent.click(closeModalButton);
    expect(closeModal).toBeCalledTimes(1);
  });
  test('should have only one link to aboutApp page', () => {
    const { queryAllByRole } = render(
      <BrowserRouter>
        <FirstVisitPage closeModal={() => {}} />
      </BrowserRouter>,
    );
    const allLinks = queryAllByRole('link');
    expect(allLinks).toHaveLength(1);
    expect(allLinks[allLinks.length - 1]).toHaveAttribute('href', '/aboutApp');
  });
});
