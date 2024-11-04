// import { render } from '@testing-library/react';
// import QCMaterialDetailInfoPanel from '../../pages/QCMaterialDetailInfoPanel.js';

// test('QCMaterialDetailInfoPanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/test_QCMaterialDetailInfoPanel.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import QCMaterialDetailInfoPanel from '../../pages/QCMaterialDetailInfoPanel';
import '@testing-library/jest-dom';
import apiClient from '../../api/apiClient';
// import { getAccessToken } from '../../utils/token';

jest.mock('../../api/apiClient', () => ({
  get: jest.fn(),
}));

jest.mock('../../utils/token', () => ({
  getAccessToken: jest.fn(() => 'mocked-access-token'),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('QCMaterialDetailInfoPanel Component', () => {
  const defaultProps = {
    selectedRow: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders and fetches data from the API', async () => {
    const mockData = {
      data: {
        content: [
          {
            id: 1,
            analyteName: 'PHOS',
            analyteId: 'a435',
            analyteFullName: 'Alkaline Phosphatase',
            mean: '39.1',
            min: '55',
            max: '121',
            siUnit: 'mEq/L',
            unit: 'mmol/L',
            selectedRule: '2',
          },
        ],
      },
    };

    apiClient.get.mockResolvedValueOnce(mockData);

    render(<QCMaterialDetailInfoPanel {...defaultProps} />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

    await expect(screen.findByText('PHOS')).resolves.toBeInTheDocument();
    expect(screen.getByText('a435')).toBeInTheDocument();
    expect(screen.getByText('Alkaline Phosphatase')).toBeInTheDocument();
    expect(screen.getByText('39.1')).toBeInTheDocument();
    expect(screen.getByText('55 - 121')).toBeInTheDocument();
    expect(screen.getByText('mEq/L')).toBeInTheDocument();
    expect(screen.getByText('mmol/L')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays no data message when there are no rows', async () => {
    apiClient.get.mockResolvedValueOnce({ data: { content: [] } });

    render(<QCMaterialDetailInfoPanel {...defaultProps} />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

    expect(screen.getByAltText('No data')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    apiClient.get.mockRejectedValueOnce(new Error('API Error'));

    render(<QCMaterialDetailInfoPanel {...defaultProps} />);

    await waitFor(() => expect(apiClient.get).toHaveBeenCalled());

    // Check if no rows are rendered due to the API error
    expect(screen.queryByText('PHOS')).not.toBeInTheDocument();
    expect(screen.getByAltText('No data')).toBeInTheDocument();
  });
});