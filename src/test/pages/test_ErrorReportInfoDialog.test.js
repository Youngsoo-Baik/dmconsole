/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// import { render } from '@testing-library/react';
// import ErrorReportInfoDialog from '../../pages/ErrorReportInfoDialog.js';

// test('ErrorReportInfoDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ErrorReportInfoDialog from '../../pages/ErrorReportInfoDialog';
import apiClient from '../../api/apiClient';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('../../api/apiClient', () => ({
  get: jest.fn(),
}));

jest.mock('../../utils/token', () => ({
  getAccessToken: jest.fn(() => 'mocked-access-token'),
}));

describe('ErrorReportInfoDialog Component', () => {
  const mockData = {
    prodName: 'Test Model',
    serial: 'SN12345',
    date: '2023-10-30',
    isSent: true,
    viewLog: 'Sample Log',
    errorTitle: 'Sample Error Title',
    panelType: 'Panel A',
    controlType: 'Control B',
  };

  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    rowId: 900,
  };

  beforeAll(() => {
    process.env.REACT_APP_API_URL = 'https://mocked-api-url.com';
  });

  afterAll(() => {
    delete process.env.REACT_APP_API_URL;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('renders dialog with loading and then displays data after API call', async () => {
  //   apiClient.get.mockResolvedValueOnce({ data: mockData });
    
  //   render(<ErrorReportInfoDialog {...defaultProps} />);
    
  //   await waitFor(() => expect(apiClient.get).toHaveBeenCalledWith(
  //     `${process.env.REACT_APP_API_URL}/console/error-messages/900`,
  //     expect.objectContaining({
  //       headers: {
  //         Authorization: 'Bearer mocked-access-token',
  //       },
  //     })
  //   ));

  //   await waitFor(() => {
  //     expect(screen.getByText('Test Model')).toBeInTheDocument();
  //     expect(screen.getByText('SN12345')).toBeInTheDocument();
  //     expect(screen.getByText('2023-10-30')).toBeInTheDocument();
  //     expect(screen.getByAltText('sent status')).toHaveAttribute('src', '/sent_complete.png');
  //     expect(screen.getByText('Sample Log')).toBeInTheDocument();
  //     expect(screen.getByText('Sample Error Title')).toBeInTheDocument();
  //     expect(screen.getByText('Panel A')).toBeInTheDocument();
  //     expect(screen.getByText('Control B')).toBeInTheDocument();
  //   });
  // });

  it('displays null content when no data is available', async () => {
    apiClient.get.mockResolvedValueOnce({ data: null });

    const { container } = render(<ErrorReportInfoDialog {...defaultProps} />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalledTimes(1));
    expect(container).toBeEmptyDOMElement();
  });

  it('handles API error gracefully', async () => {
    apiClient.get.mockRejectedValueOnce(new Error('API Error'));

    render(<ErrorReportInfoDialog {...defaultProps} />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());
    expect(screen.queryByText('Test Model')).not.toBeInTheDocument();
  });
});