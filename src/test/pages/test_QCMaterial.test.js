/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// import { render } from '@testing-library/react';
// import QCMaterial from '../../pages/QCMaterial.js';

// test('QCMaterial.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/test_QCMaterial.test.js

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import QCMaterial from '../../pages/QCMaterial';
import apiClient from '../../api/apiClient';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock API and utility imports
jest.mock('../../api/apiClient', () => ({
  get: jest.fn(),
}));

jest.mock('../../utils/token', () => ({
  getAccessToken: jest.fn(() => 'mocked-access-token'),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' }, // Provide i18n with a language property to prevent destructuring errors
  }),
}));

describe('QCMaterial Component', () => {
  const mockRows = [
    {
      id: 1,
      model: 'Test Model',
      serial: 'SN12345',
      qc_material: 'Test QC Material',
      qc_level: '3',
      lot: 'LOT123',
      expiration_date: '2023-10-30',
      modifier: 'Test Modifier',
      qc_val_version: '01',
    },
  ];

  beforeAll(() => {
    // Mock URL.createObjectURL to avoid errors in the test environment
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });

  afterAll(() => {
    // Clean up the mock to avoid side effects
    delete global.URL.createObjectURL;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('renders the loading state initially and loads data from the API', async () => {
  //   const mockData = {
  //     data: {
  //       content: [
  //         {
  //           id: 1,
  //           prodName: 'Fluoro Check Heating Block',
  //           serial: 'PCKA0-A00137',
  //           qcName: 'Liq Multqual',
  //           qcLevel: '3',
  //           qcLotNumber: 'V30AAW7V',
  //           qcExpiredDate: '2023-10-30 17:39:24',
  //           modifier: 'Manufacture',
  //           qcValueVersion: '04',
  //         },
  //       ],
  //     },
  //   };

  //   apiClient.get.mockResolvedValueOnce(mockData);

  //   render(<QCMaterial />);

  //   await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

  //   expect(screen.getByText('qc_material.header.title')).toBeInTheDocument();
  //   expect(screen.getByText((content) => content.includes('Fluoro Check Heating Block'))).toBeInTheDocument();
  //   expect(screen.getByText((content) => content.includes('Liq Multqual'))).toBeInTheDocument();
  // });

  // it('opens and closes the filter dialog', async () => {
  //   render(<QCMaterial />);

  //   const filterButton = screen.getByRole('button', { name: /button.filter_search/i });
  //   userEvent.click(filterButton);

  //   // Assert dialog opens
  //   expect(screen.queryByRole('dialog')).toBeInTheDocument();

  //   // Close the dialog
  //   fireEvent.click(screen.getByRole('button', { name: /button.cancel/i }));
  //   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  // });

  // it('filters data when filter form is submitted', async () => {
  //   apiClient.get.mockResolvedValueOnce({ data: { content: mockRows } });
  //   render(<QCMaterial />);

  //   // Open the filter dialog
  //   const filterButton = screen.getByRole('button', { name: /button.filter_search/i });
  //   userEvent.click(filterButton);

  //   // Fill in the filter fields
  //   const serialInput = screen.getByPlaceholderText('기기 S/N 입력');
  //   userEvent.type(serialInput, 'SN12345');

  //   // Submit the filter form
  //   fireEvent.click(screen.getByRole('button', { name: /button.search/i }));

  //   await waitFor(() => {
  //     // Assert the filtered data appears
  //     expect(screen.getByText('Test Model')).toBeInTheDocument();
  //     expect(screen.getByText('SN12345')).toBeInTheDocument();
  //   });
  // });

  it('exports data when download button is clicked', async () => {
    const mockData = {
      data: {
        content: [
          {
            id: 1,
            prodName: 'Fluoro Check Heating Block',
            serial: 'PCKA0-A00137',
            qcName: 'Liq Multqual',
            qcLevel: '3',
            qcLotNumber: 'V30AAW7V',
            qcExpiredDate: '2023-10-30 17:39:24',
            modifier: 'Manufacture',
            qcValueVersion: '04',
          },
        ],
      },
    };

    apiClient.get.mockResolvedValueOnce(mockData);

    render(<QCMaterial />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

    const downloadButton = screen.getByText('button.download');
    fireEvent.click(downloadButton);

    // Check if createObjectURL was called to confirm data export attempt
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it('handles API error gracefully', async () => {
    apiClient.get.mockRejectedValueOnce(new Error('API Error'));
    
    render(<QCMaterial />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());
    
    // Assert that no rows are displayed due to error
    expect(screen.queryByText('Test Model')).not.toBeInTheDocument();
    expect(screen.queryByText('SN12345')).not.toBeInTheDocument();
  });
});