import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { RegistrationForm } from './RegistrationForm';

describe('Login form component', () => {
  test('should display form elements', () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <RegistrationForm />
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
        <RegistrationForm />
      </BrowserRouter>,
    );
    const button = queryByRole('button', { name: /Register/i });
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute('disabled');
  });
  test('should have active button if login and password have correctly format', () => {
    const { queryByRole, getByLabelText } = render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
    );
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/);
    const passwordRepeatInput = getByLabelText(/Repeat/);
    const button = queryByRole('button', { name: /Register/i });
    expect(button).toBeTruthy();
    expect(button).toHaveAttribute('disabled');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    expect(button).toHaveAttribute('disabled');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(button).toHaveAttribute('disabled');
    fireEvent.change(passwordRepeatInput, { target: { value: 'testpassword' } });
    expect(button).not.toHaveAttribute('disabled');
  });
  test('should have disabled button if passwords are not the same', () => {
    const { queryByRole, getByLabelText, debug } = render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
    );
    const emailInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/);
    const passwordRepeatInput = getByLabelText(/Repeat/);
    const button = queryByRole('button', { name: /Register/i });
    expect(button).toBeTruthy();
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(passwordRepeatInput, { target: { value: 'testpasswordAnother' } });
    expect(button).toHaveAttribute('disabled');
    fireEvent.change(passwordRepeatInput, { target: { value: 'testpassword' } });
    expect(button).not.toHaveAttribute('disabled');
  });
  test('should have a link to login page', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>,
    );
    const loginLink = queryByText('log in.').parentElement;
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
