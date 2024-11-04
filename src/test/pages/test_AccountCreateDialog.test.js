
// import { render } from '@testing-library/react';
// import AccountCreateDialog from '../../pages/AccountCreateDialog.js';

// test('AccountCreateDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountCreateDialog from '../../pages/AccountCreateDialog';
import { BrowserRouter } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { getAccessToken } from '../../utils/token';

jest.mock('../../api/apiClient');
jest.mock('../../utils/token');

describe('AccountCreateDialog Component', () => {
  const mockHandleClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    apiClient.post.mockResolvedValue({ data: { message: 'User created successfully' } });
    getAccessToken.mockReturnValue('mockToken');
  });

  test('renders AccountCreateDialog without crashing', () => {
    render(
      <BrowserRouter>
        <AccountCreateDialog open={true} handleClose={mockHandleClose} onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );

    expect(screen.getByText(/account_create_dialog.title/i)).toBeInTheDocument();
  });

  // test('disables the create button with incomplete form data', () => {
  //   render(
  //     <BrowserRouter>
  //       <AccountCreateDialog open={true} handleClose={mockHandleClose} onSuccess={mockOnSuccess} />
  //     </BrowserRouter>
  //   );
  
  //   const createButtons = screen.getAllByRole('button', { name: /create/i });
  //   createButtons.forEach((button) => {
  //     expect(button).toBeDisabled();
  //   });
  // });

  // test('enables create button when form is valid and submits the form', async () => {
  //   render(
  //     <BrowserRouter>
  //       <AccountCreateDialog open={true} handleClose={mockHandleClose} onSuccess={mockOnSuccess} />
  //     </BrowserRouter>
  //   );

  //   fireEvent.change(screen.getByPlaceholderText(/email_placeholder/i), { target: { value: 'test@example.com' } });
  //   fireEvent.change(screen.getByPlaceholderText(/name_placeholder/i), { target: { value: 'John Doe' } });
  //   fireEvent.change(screen.getByPlaceholderText(/department_placeholder/i), { target: { value: 'IT' } });
  //   fireEvent.change(screen.getByPlaceholderText(/pass_placeholder/i), { target: { value: 'ValidPass1!' } });
  //   fireEvent.change(screen.getByPlaceholderText(/pass_confirm_placeholder/i), { target: { value: 'ValidPass1!' } });

  //   const createButton = screen.getByRole('button', { name: /create/i });
  //   expect(createButton).toBeEnabled();

  //   fireEvent.click(createButton);

  //   await waitFor(() => {
  //     expect(apiClient.post).toHaveBeenCalledWith(
  //       `${Config.apiUrl}/console/users`,
  //       expect.objectContaining({
  //         email: 'test@example.com',
  //         name: 'John Doe',
  //         password: 'ValidPass1!',
  //         role: 'ADMIN',
  //         department: 'IT',
  //       }),
  //       expect.objectContaining({
  //         headers: { Authorization: `Bearer mockToken` },
  //       })
  //     );
  //   });
  // });

  // test('displays validation errors for invalid input fields', async () => {
  //   render(
  //     <BrowserRouter>
  //       <AccountCreateDialog open={true} handleClose={mockHandleClose} onSuccess={mockOnSuccess} />
  //     </BrowserRouter>
  //   );

  //   const emailInput = screen.getByPlaceholderText(/email_placeholder/i);
  //   fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  //   fireEvent.blur(emailInput);

  //   const passwordInput = screen.getByPlaceholderText(/pass_placeholder/i);
  //   fireEvent.change(passwordInput, { target: { value: 'weakpass' } });
  //   fireEvent.blur(passwordInput);

  //   await waitFor(() => {
  //     expect(screen.getByText(/invalid_email/i)).toBeInTheDocument();
  //     expect(screen.getByText(/invalid_pass/i)).toBeInTheDocument();
  //   });
  // });

  test('calls handleClose when cancel button is clicked', () => {
    render(
      <BrowserRouter>
        <AccountCreateDialog open={true} handleClose={mockHandleClose} onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockHandleClose).toHaveBeenCalled();
  });
});