
// import { render } from '@testing-library/react';
// import CustomTextField from '../../components/CustomTextField.js';

// test('CustomTextField.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomTextField from '../../components/CustomTextField';
import '@testing-library/jest-dom/extend-expect';

describe('CustomTextField component', () => {
  const defaultProps = {
    id: 'custom-text-field',
    name: 'customField',
    label: 'Test Label',
    placeholder: 'Enter text',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with label and placeholder', () => {
    render(<CustomTextField {...defaultProps} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  // test('displays error styles when error prop is true', () => {
  //   render(<CustomTextField {...defaultProps} error={true} value="error text" />);
  //   const input = screen.getByLabelText('Test Label');
  //   expect(input).toHaveStyle('border: 2px solid #E02B1D');
  //   expect(input).toHaveStyle('background-color: #FFF9F9');
  // });

  // test('disables the text field when disabled prop is true', () => {
  //   render(<CustomTextField {...defaultProps} disabled={true} />);
  //   const input = screen.getByLabelText('Test Label');
  //   expect(input).toBeDisabled();
  //   expect(input).toHaveStyle('background-color: #F5F5F7');
  // });

  // test('applies active styles when focused', () => {
  //   render(<CustomTextField {...defaultProps} active={true} value="focused text" />);
  //   const input = screen.getByLabelText('Test Label');
  //   fireEvent.focus(input);
  //   expect(input).toHaveStyle('border-color: #80BEFC');
  //   expect(input).toHaveStyle('background-color: #FFFFFF');
  // });

  // test('renders with custom width and height when props are provided', () => {
  //   render(<CustomTextField {...defaultProps} width="300px" height="50px" />);
  //   const input = screen.getByLabelText('Test Label');
  //   expect(input).toHaveStyle('width: 300px');
  //   expect(input).toHaveStyle('height: 50px');
  // });

  test('handles change event', () => {
    render(<CustomTextField {...defaultProps} />);
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'New text' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  test('handles blur event', () => {
    render(<CustomTextField {...defaultProps} />);
    const input = screen.getByLabelText('Test Label');
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  test('renders as read-only when readOnly prop is true', () => {
    render(<CustomTextField {...defaultProps} readOnly={true} />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('readonly');
  });

  test('displays helper text when description prop is provided', () => {
    const description = 'Helper text for the field';
    render(<CustomTextField {...defaultProps} description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});