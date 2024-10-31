/* eslint-disable testing-library/no-wait-for-multiple-assertions */

// import { render } from '@testing-library/react';
// import SystemInfoPanel from '../../../pages/DeviceInfo/SystemInfoPanel.js';

// test('SystemInfoPanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SystemInfoPanel from '../../../pages/DeviceInfo/SystemInfoPanel';
import { BrowserRouter } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import { getAccessToken } from '../../../utils/token';

// Mock API and token utilities
jest.mock('../../../api/apiClient');
jest.mock('../../../utils/token');

describe('SystemInfoPanel Component', () => {
  const mockRowId = { rowId: '1' };

  beforeEach(() => {
    // Mock API call
    apiClient.get.mockResolvedValue({
      data: {
        serial: 'PCKA0-A00137',
        mac: '00:1A:2B:3C:4D:5E',
        sysVersion: '3.6.0',
        qteVersion: '1.5.0',
        bootVersion: '1.0.2',
        appVersion: '4.2.1',
        kernelVersion: '5.4.0',
        dspVersion: '2.3.4',
        rootFsVersion: '1.3.5',
        xmlVersion: '20231023',
      },
    });

    // Mock token retrieval
    getAccessToken.mockReturnValue('mockToken');
  });

  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SystemInfoPanel {...mockRowId} />
      </BrowserRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('fetches and displays system information', async () => {
    render(
      <BrowserRouter>
        <SystemInfoPanel {...mockRowId} />
      </BrowserRouter>
    );

    // Wait for the data to load and verify displayed values
    await waitFor(() => {
      expect(screen.getByText('PCKA0-A00137')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('00:1A:2B:3C:4D:5E')).toBeInTheDocument();
      expect(screen.getByText('3.6.0')).toBeInTheDocument();
      expect(screen.getByText('1.5.0')).toBeInTheDocument();
      expect(screen.getByText('1.0.2')).toBeInTheDocument();
      expect(screen.getByText('4.2.1')).toBeInTheDocument();
      expect(screen.getByText('5.4.0')).toBeInTheDocument();
      expect(screen.getByText('2.3.4')).toBeInTheDocument();
      expect(screen.getByText('1.3.5')).toBeInTheDocument();
      expect(screen.getByText('20231023')).toBeInTheDocument();
    });
  });

  test('handles error if API call fails', async () => {
    apiClient.get.mockRejectedValueOnce(new Error('API error'));

    render(
      <BrowserRouter>
        <SystemInfoPanel {...mockRowId} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });
});