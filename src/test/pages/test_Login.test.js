// import { render } from '@testing-library/react';
// import Login from '../../pages/Login.js';

// test('Login.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../api/auth', () => ({
  login: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('Login Component', () => {
  const mockOnLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error after each test
  });

  it('renders without errors', () => {
    render(<Login onLogin={mockOnLogin} />);

    expect(screen.getByAltText('Precision Biosensor Logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('login.email.placeholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('login.password.placeholder')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'button.login' })).toBeInTheDocument();
  });

  it('allows the user to type an email and password', () => {
    render(<Login onLogin={mockOnLogin} />);

    const emailInput = screen.getByPlaceholderText('login.email.placeholder');
    const passwordInput = screen.getByPlaceholderText('login.password.placeholder');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls login and navigates to customer-devices on successful login', async () => {
    login.mockResolvedValueOnce({});

    render(<Login onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText('login.email.placeholder'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('login.password.placeholder'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'button.login' }));

    await waitFor(() => expect(login).toHaveBeenCalledWith('test@example.com', 'password123'));
    await waitFor(() => expect(mockOnLogin).toHaveBeenCalled());
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/customer-devices'));
  });

  // it('displays an error message on failed login', async () => {
  //   login.mockRejectedValueOnce({
  //     response: { data: 'Invalid credentials' }
  //   });
  
  //   render(<Login onLogin={mockOnLogin} />);
  
  //   fireEvent.change(screen.getByPlaceholderText('login.email.placeholder'), { target: { value: 'wrong@example.com' } });
  //   fireEvent.change(screen.getByPlaceholderText('login.password.placeholder'), { target: { value: 'wrongpassword' } });
  
  //   fireEvent.click(screen.getByRole('button', { name: 'button.login' }));
  
  //   await waitFor(() => expect(login).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword'));
  //   expect(mockOnLogin).not.toHaveBeenCalled();
  //   expect(mockNavigate).not.toHaveBeenCalled();
  //   expect(console.error).toHaveBeenCalledWith('로그인 실패:', 'Invalid credentials');
  // });
});