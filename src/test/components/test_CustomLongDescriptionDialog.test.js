
// import { render } from '@testing-library/react';
// import CustomLongDescriptionDialog from '../../components/CustomLongDescriptionDialog.js';

// test('CustomLongDescriptionDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomLongDescriptionDialog from '../../components/CustomLongDescriptionDialog';
import '@testing-library/jest-dom/extend-expect';
// import { useTranslation } from 'react-i18next';

// i18n 모킹
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'button.cancel': 'Cancel',
        'button.confirm': 'Confirm',
      };
      return translations[key];
    },
  }),
}));

describe('CustomLongDescriptionDialog component', () => {
  const handleClose = jest.fn();
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const title = 'Test Title';
  const description = 'This is a long description text for testing purposes.';
  const icon = <span data-testid="test-icon">Icon</span>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders dialog with title, description, and icon', () => {
    render(
      <CustomLongDescriptionDialog
        open={true}
        handleClose={handleClose}
        icon={icon}
        title={title}
        description={description}
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('renders only confirm button when showCancelButton is false', () => {
    render(
      <CustomLongDescriptionDialog
        open={true}
        handleClose={handleClose}
        title={title}
        onConfirm={onConfirm}
      />
    );

    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).toBeNull();
  });

  test('renders both confirm and cancel buttons when showCancelButton is true', () => {
    render(
      <CustomLongDescriptionDialog
        open={true}
        handleClose={handleClose}
        title={title}
        showCancelButton={true}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onConfirm when confirm button is clicked', () => {
    render(
      <CustomLongDescriptionDialog
        open={true}
        handleClose={handleClose}
        title={title}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    render(
      <CustomLongDescriptionDialog
        open={true}
        handleClose={handleClose}
        title={title}
        showCancelButton={true}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  test('calls handleClose when dialog is closed', () => {
    render(
      <CustomLongDescriptionDialog
        open={true}
        handleClose={handleClose}
        title={title}
        description={description}
      />
    );

    fireEvent.click(screen.getByText('Confirm'));
    expect(handleClose).toHaveBeenCalled();
  });
});