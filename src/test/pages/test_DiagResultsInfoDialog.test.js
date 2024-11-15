/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// import { render } from '@testing-library/react';
// import DiagResultsInfoDialog from '../../pages/DiagResultsInfoDialog.js';

// test('DiagResultsInfoDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DiagResultsInfoDialog from '../../pages/DiagResultsInfoDialog';
import apiClient from '../../api/apiClient';

jest.mock('../../api/apiClient', () => ({
  get: jest.fn(),
}));

describe('DiagResultsInfoDialog Component', () => {
  const mockData = {
    prodName: 'Test Model',
    serial: 'SN123456',
    date: '2023-10-31',
    selfTestResult: [
      { module: 'Power', result: true },
      { module: 'PlungerMotor', result: false },
      { module: 'CameraBLU', result: true },
      { module: 'TempIC', result: false },
      { module: 'DetectorLED', result: true },
      { module: 'Heater1', result: false },
      { module: 'Print', result: true },
      { module: 'Barcode', result: false },
      { module: 'CatridgeSensor', result: true },
      { module: 'EQC', result: false },
    ],
  };

  const renderComponent = (props = {}) =>
    render(<DiagResultsInfoDialog open={true} onClose={jest.fn()} rowId={1} {...props} />);

  beforeEach(() => {
    apiClient.get.mockClear();
  });

  // it('displays loading message initially', async () => {
  //   apiClient.get.mockImplementationOnce(() => new Promise(() => {})); // mock pending state

  //   renderComponent();
  //   expect(screen.getByText(/loading/i)).toBeInTheDocument();
  // });

  it('renders dialog with data after fetching', async () => {
    apiClient.get.mockResolvedValueOnce({ data: mockData });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Test Model')).toBeInTheDocument();
      expect(screen.getByText('SN123456')).toBeInTheDocument();
      expect(screen.getByText('2023-10-31')).toBeInTheDocument();
    });

    expect(screen.getByAltText('Power Result').src).toContain('/icon-pass.png');
    expect(screen.getByAltText('Plunger Motor Result').src).toContain('/icon-fail.png');
    expect(screen.getByAltText('Camera BLU Result').src).toContain('/icon-pass.png');
  });

  it('handles API failure gracefully', async () => {
    apiClient.get.mockRejectedValueOnce(new Error('API Error'));

    renderComponent();

    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    expect(screen.queryByText('Test Model')).not.toBeInTheDocument();
  });

  it('closes the dialog when the confirm button is clicked', async () => {
    apiClient.get.mockResolvedValueOnce({ data: mockData });
    const onCloseMock = jest.fn();

    render(<DiagResultsInfoDialog open={true} onClose={onCloseMock} rowId={1} />);

    await screen.findByText('Test Model');

    userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(onCloseMock).toHaveBeenCalled();
  });
});