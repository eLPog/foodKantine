import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { OneFoodElement } from './OneFoodElement';

describe('One food element component', () => {
  test('should show correctly element title', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <OneFoodElement photo="imageTestPath" name="mealTestName" description="Test meal description" dataID="123" key="123" specialOffer={false} addMealToOrder={() => {}} />
      </BrowserRouter>,
    );
    const h1Title = queryByText('mealTestName');
    expect(h1Title).toBeTruthy();
    expect(h1Title.tagName.toLowerCase()).toBe('h2');
    expect(h1Title).toHaveClass('oneFoodElement__container__card__description__title');
  });
  test('should show link with element dataID path', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <OneFoodElement photo="imageTestPath" name="mealTestName" description="Test meal description" dataID="123TEST" key="123" specialOffer={false} addMealToOrder={() => {}} />
      </BrowserRouter>,
    );
    const detailsLink = queryByText('Details').parentElement;
    expect(detailsLink).toBeTruthy();
    expect(detailsLink).toHaveAttribute('href', '/products/123TEST');
    expect(detailsLink).not.toHaveAttribute('href', '/products/productDataID');
  });
  test('should show image from path', () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <OneFoodElement photo="imageTestPath" name="mealTestName" description="Test meal description" dataID="123TEST" key="123" specialOffer={false} addMealToOrder={() => {}} />
      </BrowserRouter>,
    );
    const image = queryByRole('img');
    expect(image).toBeTruthy();
    expect(image).toHaveAttribute('src', 'imageTestPath');
    expect(image).not.toHaveAttribute('src', 'notValidPath');
    expect(image).toHaveAttribute('alt', 'meal view');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
  test('should show special offer class if product is in special offer', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <OneFoodElement photo="imageTestPath" name="mealTestName" description="Test meal description" dataID="123TEST" key="123" specialOffer addMealToOrder={() => {}} />
      </BrowserRouter>,
    );
    const mainContainer = queryByTestId('allFoodsContainerTest');
    expect(mainContainer).toBeTruthy();
    expect(mainContainer).toHaveClass('specialOffer__select');
  });
  test('should not to show special offer class if product is not in special offer', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <OneFoodElement photo="imageTestPath" name="mealTestName" description="Test meal description" dataID="123TEST" key="123" specialOffer={false} addMealToOrder={() => {}} />
      </BrowserRouter>,
    );
    const mainContainer = queryByTestId('allFoodsContainerTest');
    expect(mainContainer).toBeTruthy();
    expect(mainContainer).not.toHaveClass('specialOffer__select');
  });
});
