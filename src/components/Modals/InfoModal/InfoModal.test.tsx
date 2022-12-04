import React from 'react';
import { render } from '@testing-library/react';
import { InfoModal } from './InfoModal';

describe('Info modal component ', () => {
  test('should show text from props value', () => {
    const { queryByText } = render(
      <InfoModal text="Test description from props" />,
    );
    const text = queryByText('Test description from props');
    expect(text).toBeTruthy();
    expect(text).toHaveClass('ProductAddedModalContainer');
    expect(text.tagName.toLowerCase()).toBe('div');
    expect(text.tagName.toLowerCase()).not.toBe('span');
  });
});
