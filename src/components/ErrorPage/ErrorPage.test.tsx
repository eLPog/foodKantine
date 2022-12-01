import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

describe('Error page component', () => {
  test('should show image', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );
    const image = document.querySelector('img');
    expect(image).toBeTruthy();
    expect(image).toHaveClass('errorPage__container__image');
    expect(image.alt).toContain('errorGraphic');
  });
  test('should have button to main page', () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );
    const button = queryByRole('button');
    expect(button).toBeTruthy();
    expect(button).toContainHTML('Main Page');
  });
});
