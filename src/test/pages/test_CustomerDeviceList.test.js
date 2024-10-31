// import { render } from '@testing-library/react';
// import CustomerDeviceList from '../../pages/CustomerDeviceList.js';

// test('CustomerDeviceList.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerDeviceList from '../../pages/CustomerDeviceList';
import CustomerDeviceInfoDialog from '../../pages/CustomerDeviceInfoDialog';
import apiClient from '../../api/apiClient';
import '@testing-library/jest-dom';
import Config from '../../Config';

jest.mock('../../api/apiClient');
jest.mock('../../pages/CustomerDeviceInfoDialog', () => jest.fn(() => <div>Mocked Device Info Dialog</div>));

describe('CustomerDeviceList Component', () => {
  const mockData = [
    {
      id: 1,
      country: 'Papua New Guinea',
      region: 'N.America',
      reseller: 'Vitaliv Health and Wellness Clinic',
      manager: 'Manager',
      model: 'Fluoro Check Heating Block',
      customer: 'customer@example.com',
      serial: 'SN12345',
      production_date: '2024-12-12',
      connection_state: true,
    },
    // More mock rows can be added here as needed
  ];

  beforeEach(() => {
    apiClient.get.mockResolvedValue({ data: { content: mockData } });
  });

  it('renders DataGrid with data fetched from API', async () => {
    render(<CustomerDeviceList />);

    // Wait for the loading spinner to disappear
    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

    // Wait for and check if data from the mock API is displayed in the grid
    expect(await screen.findByText('Papua New Guinea')).toBeInTheDocument();
    expect(await screen.findByText('Vitaliv Health and Wellness Clinic')).toBeInTheDocument();
  });

  test('displays loading spinner while fetching data', async () => {
    // Mock an API delay
    apiClient.get.mockImplementationOnce(() => new Promise(() => { }));
    render(<CustomerDeviceList />);

    // Check if spinner is displayed during loading
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  //   it('displays "No data available" message if API returns empty data', async () => {
  //     render(<CustomerDeviceList />);

  //     // Wait for loading spinner to disappear
  //     await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

  //     // Wait for and confirm "No data" message appears
  //     expect(await screen.findByText(/No data available/i)).toBeInTheDocument();
  // });

  // test('opens CustomerDeviceInfoDialog when a row is clicked', async () => {
  //     render(<CustomerDeviceList />);

  //     await waitFor(() => {
  //         expect(apiClient.get).toHaveBeenCalled();
  //     });

  //     // Click on a row to open the dialog
  //     const row = screen.getByText('Papua New Guinea');
  //     userEvent.click(row);

  //     // Check if the dialog opens
  //     expect(screen.getByText('Mocked Device Info Dialog')).toBeInTheDocument();
  // });

  // test('displays and changes pagination as per user interaction', async () => {
  //     render(<CustomerDeviceList />);

  //     await waitFor(() => {
  //         expect(apiClient.get).toHaveBeenCalled();
  //     });

  //     // Check if pagination controls are rendered
  //     expect(screen.getByText('Showing')).toBeInTheDocument();

  //     // Simulate changing the number of rows per page
  //     const select = screen.getByRole('button', { name: '10' });
  //     userEvent.click(select);
  //     const option20 = screen.getByRole('option', { name: '20' });
  //     userEvent.click(option20);

  //     // Confirm the selection
  //     expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument();
  // });

  // test('handles API errors gracefully and stops loading', async () => {
  //     apiClient.get.mockRejectedValueOnce(new Error('API Error'));

  //     render(<CustomerDeviceList />);

  //     await waitFor(() => {
  //         expect(apiClient.get).toHaveBeenCalled();
  //     });

  //     // Confirm that the loading spinner is not present after error
  //     expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  // });
});