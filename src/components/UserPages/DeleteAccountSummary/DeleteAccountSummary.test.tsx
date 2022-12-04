import React from 'react';
import { act, render } from '@testing-library/react';
import { DeleteAccountSummary } from './DeleteAccountSummary';
import { isAuthenticatedContext } from '../../../context/isAuthenticatedContext';

describe(' Delete Account Summary component ', () => {
  test('should render information about delete', () => {
    const { queryByText } = render(<DeleteAccountSummary />);
    const infoText = queryByText('Account successfully deleted');
    expect(infoText).toBeTruthy();
    expect(infoText.tagName.toLowerCase()).toBe('p');
    expect(infoText.parentElement.tagName.toLowerCase()).toBe('section');
  });
  test('should call function after 5000 ms', async () => {
    const mockContext = {
      isUserAuthenticated: true,
      userState: {
        userEmail: '',
        idToken: '',
        localId: '',
      },
      userLoginHandler: jest.fn(),
    };
    jest.useRealTimers();
    jest.spyOn(global, 'setTimeout');
    render(
      <isAuthenticatedContext.Provider value={mockContext}>
        <DeleteAccountSummary />
      </isAuthenticatedContext.Provider>,
    );
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).not.toHaveBeenLastCalledWith(expect.any(Function), 4999);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });
});
