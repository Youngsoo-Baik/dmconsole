/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// import { render } from '@testing-library/react';
// import ErrorReport from '../../pages/ErrorReport.js';

// test('ErrorReport.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ErrorReport from '../../pages/ErrorReport';
import apiClient from '../../api/apiClient';
// import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';

jest.mock('../../api/apiClient', () => ({
  get: jest.fn(),
}));

describe('ErrorReport Component', () => {
  const mockData = {
    content: [
      {
        id: 1,
        order: 1,
        prodName: 'Test Model 1',
        serial: 'SN123',
        date: '2023-10-30',
        viewLog: 'LOG123',
        errorTitle: 'Sample Error',
        isSent: true,
      },
    ],
  };

  beforeEach(() => {
    apiClient.get.mockClear();
  });

  // it('renders loading spinner initially and hides after data fetch', async () => {
  //   apiClient.get.mockImplementationOnce(() => new Promise(() => {})); // Mock pending state

  //   render(<ErrorReport />);
  //   expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Check for CircularProgress component

  //   await act(async () => {
  //     apiClient.get.mockResolvedValueOnce({ data: mockData });
  //     render(<ErrorReport />);
  //   });

  //   await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()); // Confirm loading spinner disappears
  // });

  it('fetches and displays data in DataGrid', async () => {
    apiClient.get.mockResolvedValueOnce({ data: mockData });

    render(<ErrorReport />);

    await waitFor(() => {
      expect(screen.getByText('Test Model 1')).toBeInTheDocument();
      expect(screen.getByText('SN123')).toBeInTheDocument();
      expect(screen.getByText('Sample Error')).toBeInTheDocument();
    });
  });

  it('displays "No data" overlay if there are no rows', async () => {
    apiClient.get.mockResolvedValueOnce({ data: { content: [] } });

    render(<ErrorReport />);
    
    await waitFor(() => {
      expect(screen.getByAltText('No data')).toBeInTheDocument();
    });
  });

  // it('handles pagination correctly', async () => {
  //   apiClient.get.mockResolvedValueOnce({ data: mockData });

  //   render(<ErrorReport />);

  //   await screen.findByText('Test Model 1');

  //   const nextPageButton = screen.getByRole('button', { name: /2/i });
  //   userEvent.click(nextPageButton);

  //   await waitFor(() => {
  //     expect(apiClient.get).toHaveBeenCalledTimes(1);
  //   });
  // });

  // it('applies filter and shows filtered results', async () => {
  //   apiClient.get.mockResolvedValueOnce({ data: mockData });
  //   render(<ErrorReport />);

  //   await screen.findByText('Test Model 1');

  //   userEvent.click(screen.getByText(/Filter Search/i));
  //   const serialInput = screen.getByPlaceholderText(/serial/i);

  //   userEvent.type(serialInput, 'SN123');
  //   userEvent.click(screen.getByRole('button', { name: /search/i }));

  //   await waitFor(() => {
  //     expect(apiClient.get).toHaveBeenCalled();
  //     expect(screen.getByText('Test Model 1')).toBeInTheDocument();
  //   });
  // });

  // it('executes export when download button is clicked', async () => {
  //   apiClient.get.mockResolvedValueOnce({ data: mockData });
  //   const { container } = render(<ErrorReport />);
  //   await screen.findByText('Test Model 1');

  //   const downloadButton = screen.getByRole('button', { name: /download/i });
  //   expect(downloadButton).toBeInTheDocument();
  //   userEvent.click(downloadButton);

  //   expect(container).toMatchSnapshot();
  // });
});