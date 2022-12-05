import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginForm } from './LoginForm';

describe('Login form component', () => {
  test('should display form elements', () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    expect(emailInput && passwordInput).toBeTruthy();
    expect(emailInput && passwordInput).toHaveValue('');
  });
  test('should have disabled button if inputs fields are empty', () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    const button = queryByRole('button', { name: /login/i });
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute('disabled');
  });
  test('should have active button if login and password have correctly format', () => {
    const { queryByRole, getByLabelText } = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const button = queryByRole('button', { name: /login/i });
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute('disabled');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    expect(button).toHaveAttribute('disabled');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(button).not.toHaveAttribute('disabled');
  });
  test('should have disabled button if inputs fields have wrong values', () => {
    const { queryByRole, getByLabelText } = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const button = queryByRole('button', { name: /login/i });
    fireEvent.change(emailInput, { target: { value: 'testtest.com' } });
    fireEvent.change(passwordInput, { target: { value: 'xxx' } });
    expect(button).toHaveAttribute('disabled');
  });
});
