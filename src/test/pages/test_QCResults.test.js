// import { render } from '@testing-library/react';
// import QCResults from '../../pages/QCResults.js';

// test('QCResults.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/test_QCResults.test.js

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import QCResults from '../../pages/QCResults';
import '@testing-library/jest-dom';
import apiClient from '../../api/apiClient';
import { useTranslation } from 'react-i18next';
import userEvent from '@testing-library/user-event';

jest.mock('../../api/apiClient', () => ({
  get: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' }, // Mocking language settings for i18n
  }),
}));

jest.mock('../../utils/token', () => ({
  getAccessToken: jest.fn(() => 'mocked-access-token'),
}));

describe('QCResults Component', () => {
  const mockRows = [
    {
      id: 1,
      model: 'Fluoro Check Heating Block',
      serial: 'PCKA0-A00137',
      analysis_time: '2023-10-30 17:39:24',
      cat_lot: 'V30AAW7V',
      qc_material: 'Liq Multqual',
      qc_level: '3',
      error_code: '0',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('renders and fetches data from the API', async () => {
  //   apiClient.get.mockResolvedValueOnce({ data: { content: mockRows } });

  //   render(<QCResults />);

  //   await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

  //   expect(screen.getByText('qc_result.header.title')).toBeInTheDocument();
  //   expect(screen.getByText('Fluoro Check Heating Block')).toBeInTheDocument();
  //   expect(screen.getByText('PCKA0-A00137')).toBeInTheDocument();
  //   expect(screen.getByText('2023-10-30 17:39:24')).toBeInTheDocument();
  // });

  // it('displays the filter dialog and applies filters', async () => {
  //   apiClient.get.mockResolvedValueOnce({ data: { content: mockRows } });
    
  //   render(<QCResults />);
    
  //   const filterButton = screen.getByRole('button', { name: /button.filter_search/i });
  //   userEvent.click(filterButton);

  //   expect(screen.getByRole('dialog')).toBeInTheDocument();

  //   const serialInput = screen.getByPlaceholderText('qc_result.filter_search.serial_placeholder');
  //   userEvent.type(serialInput, 'PCKA0-A00137');

  //   const searchButton = screen.getByRole('button', { name: /button.search/i });
  //   fireEvent.click(searchButton);

  //   expect(await screen.findByText('Fluoro Check Heating Block')).toBeInTheDocument();
  //   expect(await screen.findByText('PCKA0-A00137')).toBeInTheDocument();
  // });

  // it('handles pagination correctly', async () => {
  //   apiClient.get.mockResolvedValueOnce({ data: { content: mockRows } });
  
  //   render(<QCResults />);
  
  //   await waitFor(() => expect(apiClient.get).toHaveBeenCalled());
  
  //   // Wait until the pagination buttons are rendered
  //   await waitFor(() => {
  //     expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
  //   });
  
  //   const paginationButton = screen.getByRole('button', { name: '2' });
  //   userEvent.click(paginationButton);
  
  //   // Verify that the navigation to page 2 occurs
  //   expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
  // });

  it('displays no data message when API returns empty data', async () => {
    apiClient.get.mockResolvedValueOnce({ data: { content: [] } });

    render(<QCResults />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

    expect(screen.getByAltText('No data')).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    apiClient.get.mockRejectedValueOnce(new Error('API Error'));

    render(<QCResults />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

    expect(screen.getByAltText('No data')).toBeInTheDocument(); // No data due to error
  });
});