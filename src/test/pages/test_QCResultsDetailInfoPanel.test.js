// import { render } from '@testing-library/react';
// import QCResultsDetailInfoPanel from '../../pages/QCResultsDetailInfoPanel.js';

// test('QCResultsDetailInfoPanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/test_QCResultsDetailInfoPanel.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import QCResultsDetailInfoPanel from '../../pages/QCResultsDetailInfoPanel';
import apiClient from '../../api/apiClient';
import '@testing-library/jest-dom';
// import { useTranslation } from 'react-i18next';

// Mock API and translation hook
jest.mock('../../api/apiClient');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('QCResultsDetailInfoPanel Component', () => {
  const selectedRow = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('fetches and displays data from the API', async () => {
  //   const mockData = {
  //     data: {
  //       content: [
  //         {
  //           id: 1,
  //           analyteName: 'CREA',
  //           result: '-32768',
  //           finalOd: '-0.999',
  //           refRange: '-32768 - -32768',
  //           unit: 'mg/dl',
  //           bubbleOccur: '-',
  //         },
  //       ],
  //     },
  //   };

  //   apiClient.get.mockResolvedValueOnce(mockData);

  //   render(<QCResultsDetailInfoPanel selectedRow={selectedRow} />);

  //   await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

  //   // Check for the presence of the fetched data in the rendered table
  //   expect(screen.getByText('CREA')).toBeInTheDocument();
  //   expect(screen.getByText('-32768')).toBeInTheDocument();
  //   expect(screen.getByText('-0.999')).toBeInTheDocument();
  //   expect(screen.getByText('-32768 - -32768')).toBeInTheDocument();
  //   expect(screen.getByText('mg/dl')).toBeInTheDocument();
  // });

  it('displays no data overlay when API returns empty data', async () => {
    apiClient.get.mockResolvedValueOnce({ data: { content: [] } });

    render(<QCResultsDetailInfoPanel selectedRow={selectedRow} />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

    // Verify "no data" message is displayed
    expect(screen.getByAltText('No data')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    apiClient.get.mockRejectedValueOnce(new Error('API Error'));

    render(<QCResultsDetailInfoPanel selectedRow={selectedRow} />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

    // Verify "no data" message is displayed due to API error
    expect(screen.getByAltText('No data')).toBeInTheDocument();
  });
});