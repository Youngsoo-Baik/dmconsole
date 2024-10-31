
// import { render } from '@testing-library/react';
// import CustomImgSelect from '../../components/CustomImgSelect.js';

// test('CustomImgSelect.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomImgSelect from '../../components/CustomImgSelect';
import '@testing-library/jest-dom/extend-expect';

describe('CustomImgSelect component', () => {
  const defaultProps = {
    name: 'custom-select',
    id: 'custom-select-id',
    label: 'Select Item',
    value: '',
    onChange: jest.fn(),
    menuItems: [
      { value: 'item1', label: 'Item 1', icon: '/path/to/icon1.png' },
      { value: 'item2', label: 'Item 2', icon: '/path/to/icon2.png' },
    ],
    placeholder: 'Please select an item',
  };

  test('renders CustomImgSelect with placeholder when no value is selected', () => {
    render(<CustomImgSelect {...defaultProps} />);
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.placeholder)).toBeInTheDocument();
  });

  test('displays selected item icon when a value is selected', () => {
    render(<CustomImgSelect {...defaultProps} value="item1" />);
    const selectedIcon = screen.getByAltText('Selected icon');
    expect(selectedIcon).toHaveAttribute('src', '/path/to/icon1.png');
  });

  test('renders menu items when opened', () => {
    render(<CustomImgSelect {...defaultProps} />);
    const selectBox = screen.getByRole('combobox');
    
    fireEvent.mouseDown(selectBox); // Open the select menu
    expect(screen.getByAltText('item1')).toBeInTheDocument();
    expect(screen.getByAltText('item2')).toBeInTheDocument();
  });

  test('calls onChange handler when an item is selected', () => {
    render(<CustomImgSelect {...defaultProps} />);
    const selectBox = screen.getByRole('combobox');
    
    fireEvent.mouseDown(selectBox);
    const menuItem = screen.getByAltText('item1');
    fireEvent.click(menuItem);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    // expect(defaultProps.onChange).toHaveBeenCalledWith(expect.anything()); // 수정된 부분
  });

  test('displays error message if error prop is provided', () => {
    const errorMessage = 'Selection is required';
    render(<CustomImgSelect {...defaultProps} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('displays description if description prop is provided', () => {
    const description = 'Please select one of the options';
    render(<CustomImgSelect {...defaultProps} description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});