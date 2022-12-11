import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EmailChange } from './EmailChange';

describe('Email change component', () => {
  test('Should change input value', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <EmailChange />
      </BrowserRouter>,
    );
    const input = getByRole('textbox');
    expect(input).toHaveValue('');
    fireEvent.change(input, {
      target: {
        value: 'email@test.com',
      },
    });
    expect(input).not.toHaveValue('');
    expect(input).toHaveValue('email@test.com');
  });
  test('should have clickable save button only if email value is correct', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <EmailChange />
      </BrowserRouter>,
    );
    const input = getByRole('textbox');
    const button = getByRole('button', { name: 'Save' });
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute('disabled');
    fireEvent.change(input, {
      target: {
        value: 'emailtest@',
      },
    });
    expect(button).toHaveAttribute('disabled');
    fireEvent.change(input, {
      target: {
        value: 'email@test.com',
      },
    });
    expect(button).not.toHaveAttribute('disabled');
  });
  test('should have cancel button as a link to user page', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <EmailChange />
      </BrowserRouter>,
    );
    const cancelButton = getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeTruthy();
    expect(cancelButton).toHaveClass('btn-primary');
    expect(cancelButton.parentElement).toHaveAttribute('href', '/user');
  });
});
