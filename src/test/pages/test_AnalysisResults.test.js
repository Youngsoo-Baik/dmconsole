// import { render } from '@testing-library/react';
// import AnalysisResults from '../../pages/AnalysisResults.js';

// test('AnalysisResults.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnalysisResults from '../../pages/AnalysisResults';
import apiClient from '../../api/apiClient';
// import { getAccessToken } from '../../utils/token';

// Mock getAccessToken to return a dummy token
jest.mock('../../utils/token', () => ({
  getAccessToken: jest.fn(() => 'test-token')
}));

// Mock apiClient to avoid real API calls
jest.mock('../../api/apiClient', () => ({
  get: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: { language: 'en' },
    }),
}));

describe('AnalysisResults Component', () => {
  beforeEach(() => {
    // Mock API response for Analysis Results
    apiClient.get.mockResolvedValueOnce({
      data: {
        content: [
          { id: 1, order: '123', prodName: 'Product A', serial: 'A001', date: '2023-01-01', lotNumber: 'L001', errorCode: '0' },
          { id: 2, order: '124', prodName: 'Product B', serial: 'A002', date: '2023-01-02', lotNumber: 'L002', errorCode: '1' },
        ],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders DataGrid with data from API', async () => {
    render(<AnalysisResults />);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(1);
    });
  });

  test('calls handleViewAll to reset data when View All button is clicked', async () => {
    render(<AnalysisResults />);

    const viewAllButton = screen.getByText(/button.view_all/i);
    fireEvent.click(viewAllButton);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(1);
    });
  });

  // test('opens filter dialog and applies filter', async () => {
  //   render(<AnalysisResults />);

  //   const filterButton = screen.getByText(/button.filter_search/i);
  //   fireEvent.click(filterButton);

  //   // Wait for the dialog to open
  //   const dialog = await screen.findByRole('dialog');
  //   expect(dialog).toBeInTheDocument();

  //   const modelSelect = screen.getByTestId('model');
  //   fireEvent.change(modelSelect, { target: { value: 'Product A' } });

  //   const searchButton = screen.getByText(/button.search/i);
  //   fireEvent.click(searchButton);

  //   await waitFor(() => {
  //     const filteredRow = screen.getByText('Product A');
  //     expect(filteredRow).toBeInTheDocument();
  //   });
  // });

    // test('pagination is working', async () => {
    //     const nextButton = screen.getByRole('button', { name: /2/ });
    //     fireEvent.click(nextButton);
    //     await waitFor(() => {
    //         const rows = screen.getAllByRole('row');
    //         expect(rows.length).toBeGreaterThan(1);
    //     });
    // });
});