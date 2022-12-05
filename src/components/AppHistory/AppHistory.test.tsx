import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppHistory } from './AppHistory';
import { HistoryElementRight } from './HistoryElementRight';

describe('App history component', () => {
  test('should render container with timeline', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <AppHistory />
      </BrowserRouter>,
    );
    const timelineContainer = queryByTestId('timelineContainer');
    expect(timelineContainer).toBeTruthy();
    expect(timelineContainer).toHaveClass('timeline');
  });
  test('should have button with text home', () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <AppHistory />
      </BrowserRouter>,
    );
    const homeButton = queryByRole('button', { name: 'Home' });
    expect(homeButton).toBeTruthy();
    expect(homeButton).toHaveClass('btn-primary');
  });
  test('should have link to main page', () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <AppHistory />
      </BrowserRouter>,
    );
    const homeLink = queryByRole('link');
    expect(homeLink).toHaveAttribute('href', '/');
  });
  test('should correctly show data elements from props', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <HistoryElementRight version="3.0.0" content="Some content test" date="September 2040" />
      </BrowserRouter>,
    );
    const date = queryByText('September 2040');
    expect(date).toBeTruthy();
    expect(date).toHaveClass('timelineDate--right');
    const version = queryByText('3.0.0');
    expect(version).toBeTruthy();
    expect(version).toHaveClass('timelineComponent__version');
    expect(version.tagName.toLowerCase()).toBe('h2');
    const content = queryByText('Some content test');
    expect(content).toBeTruthy();
    expect(content.tagName.toLowerCase()).toBe('p');
    expect(content).not.toHaveClass('');
  });
});
