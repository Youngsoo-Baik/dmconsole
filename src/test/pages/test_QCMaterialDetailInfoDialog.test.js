// import { render } from '@testing-library/react';
// import QCMaterialDetailInfoDialog from '../../pages/QCMaterialDetailInfoDialog.js';

// test('QCMaterialDetailInfoDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/test_QCMaterialDetailInfoDialog.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QCMaterialDetailInfoDialog from '../../pages/QCMaterialDetailInfoDialog';
import '@testing-library/jest-dom';
// import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('../../pages/QCMaterialDetailInfoPanel', () => ({
  __esModule: true,
  default: () => <div>QCMaterialDetailInfoPanel</div>,
}));

describe('QCMaterialDetailInfoDialog Component', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    selectedRow: { id: 1, name: 'Sample QC Material' },
  };

  it('renders the dialog with the correct title and close button', () => {
    render(<QCMaterialDetailInfoDialog {...defaultProps} />);

    // Check for the dialog title
    expect(screen.getByText('qc_material.detail_dialog.title')).toBeInTheDocument();

    // Check if QCMaterialDetailInfoPanel component renders
    expect(screen.getByText('QCMaterialDetailInfoPanel')).toBeInTheDocument();

    // Check for the close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('calls the onClose function when close button is clicked', () => {
    render(<QCMaterialDetailInfoDialog {...defaultProps} />);

    // Click the close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Expect the onClose prop to have been called
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('changes tab when a tab is clicked', () => {
    render(<QCMaterialDetailInfoDialog {...defaultProps} />);

    // Find and click the first tab (only one tab in this case)
    const tab = screen.getByText('qc_material.detail_dialog.title');
    fireEvent.click(tab);

    // Check if the correct panel displays based on tab selection
    expect(screen.getByText('QCMaterialDetailInfoPanel')).toBeInTheDocument();
  });
});