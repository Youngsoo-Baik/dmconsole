/* eslint-disable testing-library/no-node-access */

// import { render } from '@testing-library/react';
// import CustomEditTextField from '../../components/CustomEditTextField.js';

// test('CustomEditTextField.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomEditTextField from '../../components/CustomEditTextField';
import '@testing-library/jest-dom/extend-expect';

describe('CustomEditTextField component', () => {
  const defaultProps = {
    id: 'test-input',
    name: 'testName',
    label: 'Test Label',
    placeholder: 'Enter text',
    description: 'Helper text',
    value: 'initial value',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  test('renders CustomEditTextField with given props', () => {
    render(<CustomEditTextField {...defaultProps} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByText('Helper text')).toBeInTheDocument();
    expect(screen.getByDisplayValue('initial value')).toBeInTheDocument();
  });

  test('applies error styles when error prop is true', () => {
    render(<CustomEditTextField {...defaultProps} error />);
    const inputWrapper = screen.getByLabelText('Test Label').closest('.MuiOutlinedInput-root');
    expect(inputWrapper).toHaveStyle('border: 2px solid #E02B1D');
    // expect(inputWrapper).toHaveStyle('background-color: #FFF9F9');
  });

  test('disables the text field when disabled prop is true', () => {
    render(<CustomEditTextField {...defaultProps} disabled />);
    const inputWrapper = screen.getByLabelText('Test Label').closest('.MuiOutlinedInput-root');
    expect(screen.getByLabelText('Test Label')).toBeDisabled();
    expect(inputWrapper).toHaveStyle('background-color: #F5F5F7');
  });

  test('applies active styles when focused', () => {
    render(<CustomEditTextField {...defaultProps} active />);
    const inputWrapper = screen.getByLabelText('Test Label').closest('.MuiOutlinedInput-root');
    fireEvent.focus(screen.getByLabelText('Test Label'));
    expect(inputWrapper).toHaveStyle('border-color: #80BEFC');
    expect(inputWrapper).toHaveStyle('background-color: #FFFFFF');
  });

  test('calls onChange and onBlur handlers when input changes and loses focus', () => {
    render(<CustomEditTextField {...defaultProps} />);
    const input = screen.getByLabelText('Test Label');
    
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));

    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalledTimes(1);
  });

  test('renders with readonly attribute when readOnly prop is true', () => {
    render(<CustomEditTextField {...defaultProps} readOnly />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('readonly');
  });

  test('applies custom width and height styles when width and height props are provided', () => {
    render(<CustomEditTextField {...defaultProps} width="300px" height="50px" />);
    const inputWrapper = screen.getByLabelText('Test Label').closest('.MuiOutlinedInput-root');
    expect(inputWrapper).toHaveStyle('width: 300px');
    expect(inputWrapper).toHaveStyle('height: 50px');
  });

  test('renders as a password field when type prop is "password"', () => {
    render(<CustomEditTextField {...defaultProps} type="password" />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'password');
  });
});