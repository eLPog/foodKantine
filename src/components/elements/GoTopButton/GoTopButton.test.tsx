import React from 'react';
import { render } from '@testing-library/react';
import { GoToTopButton } from './GoToTopButton';

describe('Go Top Button component', () => {
  test('button should be correctly rendered', () => {
    const { queryByRole } = render(<GoToTopButton />);
    const button = queryByRole('button');
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute('title', 'Go to top of the page');
  });
  test('should have a link with anchor', () => {
    const { queryByRole } = render(<GoToTopButton />);
    const link = queryByRole('link');
    expect(link).toBeTruthy();
    expect(link).toHaveAttribute('href', '#searchStart');
    expect(link).not.toHaveAttribute('href', '#testAnchor');
  });
  test('should render icon', () => {
    const { queryByTestId } = render(<GoToTopButton />);
    const svg = queryByTestId('svgTestElement');
    expect(svg).toBeTruthy();
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svg).toHaveClass('bi-arrow-up-circle');
  });
});
