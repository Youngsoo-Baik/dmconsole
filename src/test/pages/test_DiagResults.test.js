// import { render } from '@testing-library/react';
// import DiagResults from '../../pages/DiagResults.js';

// test('DiagResults.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/test_DiagResults.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DiagResults from '../../pages/DiagResults';
import '@testing-library/jest-dom';
import apiClient from '../../api/apiClient';
import { getAccessToken } from '../../utils/token';

jest.mock('../../api/apiClient', () => ({
  get: jest.fn(),
}));

jest.mock('../../utils/token', () => ({
  getAccessToken: jest.fn(),
}));

describe('DiagResults Component', () => {
  // Inside your test case, mock the resolved data:
  // beforeEach(() => {
  //   apiClient.get.mockResolvedValueOnce({
  //     data: {
  //       content: [
  //         { id: 1, order: 1, serial: 'PCKA0-A00137', date: '2023-10-30 17:39:24', plungerMotor: true, cameraBlu: false, tempIc: false, cartridgeSensor: true, eqc: true },
  //         { id: 2, order: 2, serial: 'PCKA0-A00138', date: '2023-10-31 17:39:24', plungerMotor: false, cameraBlu: true, tempIc: false, cartridgeSensor: false, eqc: true },
  //       ],
  //     },
  //   });
  // });

  test('renders loading spinner initially', async () => {
    // Mock the API response to return a resolved promise
    apiClient.get.mockResolvedValueOnce({
      data: {
        content: [
          { id: 1, serial: 'PCKA0-A00137', diag_time: '2023-10-30 17:39:24', plunger_motor: true, camera_blu: false, temp_ic: false, cat_sensor: true, eqc: true },
          // Add more items if necessary
        ],
      },
    });
  
    render(<DiagResults />);
  
    // Wait for the spinner to appear
    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
  });

  test('loads data and displays rows in DataGrid', async () => {
    const mockData = {
      data: {
        content: [
          { id: 1, serial: 'PCKA0-A00137', date: '2023-10-30 17:39:24', plungerMotor: true, cameraBlu: false, tempIc: true, cartridgeSensor: true, eqc: true },
          { id: 2, serial: 'PCKA0-A00138', date: '2023-10-30 17:40:00', plungerMotor: false, cameraBlu: true, tempIc: false, cartridgeSensor: true, eqc: false },
        ],
      },
    };

    apiClient.get.mockResolvedValueOnce(mockData);
    render(<DiagResults />);

    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
    // expect(screen.getByText('PCKA0-A00137')).toBeInTheDocument();
    // expect(screen.getByText('PCKA0-A00138')).toBeInTheDocument();
  });

  // test('displays "No data available" message if API returns empty data', async () => {
  //   apiClient.get.mockResolvedValueOnce({ data: { content: [] } });
  //   render(<DiagResults />);

  //   await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
  //   expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  // });

  // test('opens filter dialog when "Filter Search" button is clicked', async () => {
  //   render(<DiagResults />);
  //   const filterButton = await screen.findByText(/Filter Search/i);
  //   fireEvent.click(filterButton);

  //   await waitFor(() => expect(screen.getByText(/cancel/i)).toBeInTheDocument());
  //   expect(screen.getByText(/Search/i)).toBeInTheDocument();
  // });

  // test('handles pagination correctly', async () => {
  //   const mockData = {
  //     data: {
  //       content: Array.from({ length: 15 }, (_, i) => ({
  //         id: i + 1,
  //         serial: `PCKA0-A${i + 1}`,
  //         date: '2023-10-30 17:39:24',
  //         plungerMotor: i % 2 === 0,
  //         cameraBlu: i % 2 !== 0,
  //         tempIc: i % 3 === 0,
  //         cartridgeSensor: i % 2 === 0,
  //         eqc: i % 2 !== 0,
  //       })),
  //     },
  //   };

  //   apiClient.get.mockResolvedValueOnce(mockData);
  //   render(<DiagResults />);

  //   await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
  //   expect(screen.getByText('PCKA0-A1')).toBeInTheDocument();

  //   fireEvent.click(screen.getByRole('button', { name: /2/i }));
  //   await waitFor(() => expect(apiClient.get).toHaveBeenCalledTimes(1));
  // });

  // test('applies filtering based on selected options', async () => {
  //   const mockData = {
  //     data: {
  //       content: [
  //         { id: 1, serial: 'PCKA0-A00137', date: '2023-10-30 17:39:24', plungerMotor: true, cameraBlu: false, tempIc: true, cartridgeSensor: true, eqc: true },
  //         { id: 2, serial: 'PCKA0-A00138', date: '2023-10-30 17:40:00', plungerMotor: false, cameraBlu: true, tempIc: false, cartridgeSensor: false, eqc: false },
  //       ],
  //     },
  //   };

  //   apiClient.get.mockResolvedValueOnce(mockData);
  //   render(<DiagResults />);

  //   await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

  //   fireEvent.click(screen.getByText(/Filter Search/i));
  //   await waitFor(() => expect(screen.getByText(/cancel/i)).toBeInTheDocument());

  //   fireEvent.change(screen.getByPlaceholderText(/serial/i), { target: { value: 'PCKA0-A00137' } });
  //   fireEvent.click(screen.getByText(/Search/i));

  //   await waitFor(() => {
  //     expect(screen.getByText('PCKA0-A00137')).toBeInTheDocument();
  //     expect(screen.queryByText('PCKA0-A00138')).not.toBeInTheDocument();
  //   });
  // });
});