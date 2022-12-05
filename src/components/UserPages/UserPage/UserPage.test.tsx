import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  act, fireEvent, render, waitFor,
} from '@testing-library/react';
import { UserPage } from './UserPage';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

describe('User Page component on not test account', () => {
  const mockContext = {
    isUserAuthenticated: false,
    userState: {
      userEmail: 'testUser@mail.com',
      localId: '123test',
      idToken: '123test',
    },
    userLoginHandler: () => {},
  };
  test('should show user email from context', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <isAuthenticatedContext.Provider value={mockContext}>
          <UserPage />
        </isAuthenticatedContext.Provider>
      </BrowserRouter>,
    );
    const userEmail = queryByText('testUser@mail.com');
    expect(userEmail).toBeTruthy();
    expect(userEmail).toHaveClass('--specific');
    expect(userEmail.tagName.toLowerCase()).toBe('span');
  });

  test('should show delete confirm after delete button click', () => {
    const {
      queryByText, queryByRole, queryByTestId, debug,
    } = render(
      <BrowserRouter>
        <isAuthenticatedContext.Provider value={mockContext}>
          <UserPage />
        </isAuthenticatedContext.Provider>
      </BrowserRouter>,
    );
    const button = queryByRole('button', { name: 'Delete account' });
    fireEvent.click(button);
    const info = queryByText(/Do You really want to delete Your account?/);
    expect(info).toBeInTheDocument();
    expect(info.tagName.toLowerCase()).toBe('p');
  });
});
describe('User Page component on test account', () => {
  const mockContext = {
    isUserAuthenticated: false,
    userState: {
      userEmail: 'test@test.com',
      localId: '123test',
      idToken: '123test',
    },
    userLoginHandler: () => {},
  };
  test('should show info about test account', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <isAuthenticatedContext.Provider value={mockContext}>
          <UserPage />
        </isAuthenticatedContext.Provider>
      </BrowserRouter>,
    );
    const info = queryByText(/editing functions are blocked/);
    expect(info.tagName.toLowerCase()).toBe('p');
    expect(info).toHaveClass('userPage__container__testAccountInfo');
  });
  test('should show info about test account after click delete button', () => {
    const {
      queryByText, queryByRole, queryByTestId, debug,
    } = render(
      <BrowserRouter>
        <isAuthenticatedContext.Provider value={mockContext}>
          <UserPage />
        </isAuthenticatedContext.Provider>
      </BrowserRouter>,
    );
    const button = queryByRole('button', { name: 'Delete account' });
    fireEvent.click(button);
    const info = queryByText(/You cannot make this changes on test account./);
    expect(info).toBeInTheDocument();
    expect(info.tagName.toLowerCase()).toBe('p');
    expect(info.parentElement).toHaveClass('testAccountError');
  });
  test('should call reset password function after click on button', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve([]),
    }));
    act(() => {
      render(
        <BrowserRouter>
          <isAuthenticatedContext.Provider value={mockContext}>
            <UserPage />
          </isAuthenticatedContext.Provider>
        </BrowserRouter>,
      );
    });
  });
});
