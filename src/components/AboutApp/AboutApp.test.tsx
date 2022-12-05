import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AboutApp } from './AboutApp';

describe('About app component', () => {
  test('should have title in h1', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <AboutApp />
      </BrowserRouter>,
    );
    const text = queryByText('About App');
    expect(text.tagName.toLowerCase()).toBe('h1');
    expect(text).toHaveClass('about__title');
  });
  test('should have 5 links to another pages', () => {
    const { queryAllByRole } = render(
      <BrowserRouter>
        <AboutApp />
      </BrowserRouter>,
    );
    const allLinks = queryAllByRole('link');
    expect(allLinks).toHaveLength(6);
    for (let i = 0; i < allLinks.length; i++) {
      expect(allLinks[i]).toHaveAttribute('href');
    }
  });
  test('should have link (at last position) with button, to the main page', () => {
    const { queryAllByRole } = render(
      <BrowserRouter>
        <AboutApp />
      </BrowserRouter>,
    );
    const allLinks = queryAllByRole('link');
    const lastLink = allLinks[allLinks.length - 1];
    const button = allLinks[allLinks.length - 1].firstChild;
    expect(lastLink).toHaveAttribute('href', '/');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('btn-primary');
    expect(button).toHaveTextContent('Main Page');
  });
});
