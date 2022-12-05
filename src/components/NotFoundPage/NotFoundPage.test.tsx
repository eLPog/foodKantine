import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

describe('Header component', () => {
  test('Should have p element with information about error page', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );
    const errorParagraph = queryByTestId('notFoundPageTest');
    expect(errorParagraph).toBeTruthy();
    expect(errorParagraph).toHaveClass('notfound__container__information');
    expect(errorParagraph).toContainHTML('br');
  });
  test('Should show error page image', () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );
    const image = queryByRole('img');
    expect(image).toBeTruthy();
    expect(image).toHaveClass('notfound__container__image');
    expect(image).toHaveAttribute('src', 'https://foodorder.networkmanager.pl/img/imgnotfound.svg');
    expect(image).not.toHaveAttribute('src', 'https://fakePathPicture.svg');
  });
});
