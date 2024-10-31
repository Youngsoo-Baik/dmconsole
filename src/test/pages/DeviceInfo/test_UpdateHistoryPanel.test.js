/* eslint-disable testing-library/no-wait-for-multiple-assertions */

// import { render } from '@testing-library/react';
// import UpdateHistoryPanel from '../../../pages/DeviceInfo/UpdateHistoryPanel.js';

// test('UpdateHistoryPanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateHistoryPanel from '../../../pages/DeviceInfo/UpdateHistoryPanel';
import { BrowserRouter } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import { getAccessToken } from '../../../utils/token';

jest.mock('../../../api/apiClient');
jest.mock('../../../utils/token');

describe('UpdateHistoryPanel Component', () => {
  const mockRowId = '1';

  beforeEach(() => {
    // Mock the API call
    apiClient.get.mockResolvedValue({
      data: {
        content: [
          {
            moduleName: 'system',
            completeTime: '2021-11-24 18:45:10',
            elapsedTime: '2m 53s.367',
            oldVersion: '1.00.15.0011',
            newVersion: '1.00.15.0012',
            method: 'INTERNET',
          },
        ],
      },
    });

    // Mock the token retrieval
    getAccessToken.mockReturnValue('mockToken');
  });

  // test('renders without crashing and shows the loading state initially', () => {
  //   render(
  //     <BrowserRouter>
  //       <UpdateHistoryPanel rowId={mockRowId} />
  //     </BrowserRouter>
  //   );
  //   expect(screen.getByText(/loading/i)).toBeInTheDocument();
  // });

  test('fetches and displays update history data', async () => {
    render(
      <BrowserRouter>
        <UpdateHistoryPanel rowId={mockRowId} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('system')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('2021-11-24 18:45:10')).toBeInTheDocument();
      expect(screen.getByText('2m 53s.367')).toBeInTheDocument();
      expect(screen.getByText('1.00.15.0011')).toBeInTheDocument();
      expect(screen.getByText('INTERNET')).toBeInTheDocument();
    });
  });

  // test('handles API errors gracefully', async () => {
  //   apiClient.get.mockRejectedValueOnce(new Error('API error'));

  //   render(
  //     <BrowserRouter>
  //       <UpdateHistoryPanel rowId={mockRowId} />
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText(/loading/i)).toBeInTheDocument();
  //   });
  // });
});