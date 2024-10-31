// import { render } from '@testing-library/react';
// import QCResultsDetailInfoDialog from '../../pages/QCResultsDetailInfoDialog.js';

// test('QCResultsDetailInfoDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/test_QCResultsDetailInfoDialog.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QCResultsDetailInfoDialog from '../../pages/QCResultsDetailInfoDialog';
import '@testing-library/jest-dom';
import { useTranslation } from 'react-i18next';

// Mock child component and translation hook
jest.mock('../../pages/QCResultsDetailInfoPanel', () => () => <div>QCResultsDetailInfoPanel Content</div>);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('QCResultsDetailInfoDialog Component', () => {
  const mockOnClose = jest.fn();
  const selectedRow = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<QCResultsDetailInfoDialog open={true} onClose={mockOnClose} selectedRow={selectedRow} />);

    // Verify dialog is open and contains the close button
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();

    // Verify the tab with the translation key label
    expect(screen.getByText('qc_result.detail_dialog.title')).toBeInTheDocument();

    // Verify the content of QCResultsDetailInfoPanel is rendered
    expect(screen.getByText('QCResultsDetailInfoPanel Content')).toBeInTheDocument();
  });

  it('calls onClose function when close button is clicked', () => {
    render(<QCResultsDetailInfoDialog open={true} onClose={mockOnClose} selectedRow={selectedRow} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when open is false', () => {
    render(<QCResultsDetailInfoDialog open={false} onClose={mockOnClose} selectedRow={selectedRow} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});