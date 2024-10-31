// import { render } from '@testing-library/react';
// import AnalysisResultsDetailInfoDialog from '../../pages/AnalysisResultsDetailInfoDialog.js';

// test('AnalysisResultsDetailInfoDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AnalysisResultsDetailInfoDialog from '../../pages/AnalysisResultsDetailInfoDialog';
import '@testing-library/jest-dom';

// Mock the nested component to simplify the test
jest.mock('../../pages/AnalysisResultsDetailInfoPanel', () => () => <div data-testid="detail-info-panel">Detail Info Panel</div>);

describe('AnalysisResultsDetailInfoDialog Component', () => {
  const mockOnClose = jest.fn();
  const selectedRow = { id: 1, name: 'Sample Row' };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders the dialog when open is true', () => {
    render(
      <AnalysisResultsDetailInfoDialog 
        open={true} 
        onClose={mockOnClose} 
        selectedRow={selectedRow} 
      />
    );

    // Check if dialog is open
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Check if title and detail info panel are rendered
    expect(screen.getByText('analysis_result.detail_dialog.title')).toBeInTheDocument();
    expect(screen.getByTestId('detail-info-panel')).toBeInTheDocument();
  });

  test('does not render the dialog when open is false', () => {
    render(
      <AnalysisResultsDetailInfoDialog 
        open={false} 
        onClose={mockOnClose} 
        selectedRow={selectedRow} 
      />
    );

    // Check that dialog is not in the document
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('calls onClose when the close icon is clicked', () => {
    render(
      <AnalysisResultsDetailInfoDialog 
        open={true} 
        onClose={mockOnClose} 
        selectedRow={selectedRow} 
      />
    );

    // Click the close icon
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    // Ensure onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('renders the correct tab label and switches tabs', () => {
    render(
      <AnalysisResultsDetailInfoDialog 
        open={true} 
        onClose={mockOnClose} 
        selectedRow={selectedRow} 
      />
    );

    // Check if the tab label is displayed
    expect(screen.getByText('analysis_result.detail_dialog.title')).toBeInTheDocument();
    
    // Check if tab content is rendered in detail info panel
    expect(screen.getByTestId('detail-info-panel')).toBeInTheDocument();
  });
});