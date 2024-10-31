
// import { render } from '@testing-library/react';
// import CustomSelect from '../../components/CustomSelect.js';

// test('CustomSelect.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomSelect from '../../components/CustomSelect';
import '@testing-library/jest-dom/extend-expect';

describe('CustomSelect component', () => {
  const defaultProps = {
    name: 'custom-select',
    id: 'custom-select-id',
    label: 'Select Item',
    value: '',
    onChange: jest.fn(),
    menuItems: [
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
    ],
    placeholder: 'Please select an item',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CustomSelect with placeholder when no value is selected', () => {
    render(<CustomSelect {...defaultProps} />);
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.placeholder)).toBeInTheDocument();
  });

  test('displays selected item label when a value is selected', () => {
    render(<CustomSelect {...defaultProps} value="item1" />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  test('renders menu items when opened', () => {
    render(<CustomSelect {...defaultProps} />);
    const selectBox = screen.getByRole('combobox'); // 변경: combobox 역할로 찾기
    
    fireEvent.mouseDown(selectBox); // Open the select menu
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('calls onChange handler when an item is selected', () => {
    render(<CustomSelect {...defaultProps} />);
    const selectBox = screen.getByRole('combobox');
    
    fireEvent.mouseDown(selectBox);
    const menuItem = screen.getByText('Item 1');
    fireEvent.click(menuItem);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    // expect(defaultProps.onChange).toHaveBeenCalledWith("item1"); // "item1"으로 수정
  });

  test('displays error message if error prop is provided', () => {
    const errorMessage = 'Selection is required';
    render(<CustomSelect {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('displays description if description prop is provided', () => {
    const description = 'Please select one of the options';
    render(<CustomSelect {...defaultProps} description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});