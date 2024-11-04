/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// import { render } from '@testing-library/react';
// import AnalysisResultsDetailInfoPanel from '../../pages/AnalysisResultsDetailInfoPanel.js';

// test('AnalysisResultsDetailInfoPanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AnalysisResultsDetailInfoPanel from '../../pages/AnalysisResultsDetailInfoPanel';
import '@testing-library/jest-dom';
import apiClient from '../../api/apiClient';
// import Config from '../../Config';
import { getAccessToken } from '../../utils/token';

jest.mock('../../api/apiClient');
jest.mock('../../utils/token', () => ({
    getAccessToken: jest.fn(),
}));

describe('AnalysisResultsDetailInfoPanel Component', () => {
    const mockSelectedRow = 1;
    const mockApiData = {
        data: {
            content: [
                { id: 1, order: 1, analyteName: 'CREA', result: '10', finalOd: '-0.999', refRange: '-32768 - -32768', unit: 'mg/dl', bubbleOccur: '-', abFlag: 'N' },
                { id: 2, order: 2, analyteName: 'BUN', result: '20', finalOd: '-1.000', refRange: '10 - 20', unit: 'mg/dl', bubbleOccur: '-', abFlag: 'H' },
            ]
        }
    };

    beforeEach(() => {
        // Mock token and API response setup
        getAccessToken.mockReturnValue('mock-token');
        apiClient.get.mockResolvedValue(mockApiData);
    });

    test('renders DataGrid with data from API', async () => {
        render(<AnalysisResultsDetailInfoPanel selectedRow={mockSelectedRow} />);

        // Wait for DataGrid to render with data
        await waitFor(() => {
            expect(screen.getByRole('grid')).toBeInTheDocument();
            expect(screen.getByText('CREA')).toBeInTheDocument();
            expect(screen.getByText('BUN')).toBeInTheDocument();
        });
    });

    // test('displays "No data available" message when API returns an empty array', async () => {
    //     apiClient.get.mockResolvedValueOnce({ data: { content: [] } });  // Mock empty response

    //     render(<AnalysisResultsDetailInfoPanel selectedRow={mockSelectedRow} />);

    //     // Wait for "No data" message to appear
    //     await waitFor(() => {
    //         const noDataMessage = screen.getByText(/no data available/i);  // Use regex to ignore case
    //         expect(noDataMessage).toBeInTheDocument();
    //     });
    // });

    // test('displays error message if API call fails', async () => {
    //     apiClient.get.mockRejectedValueOnce(new Error('API Error'));  // Mock an API failure

    //     render(<AnalysisResultsDetailInfoPanel selectedRow={mockSelectedRow} />);

    //     // Wait for error message to appear
    //     await waitFor(() => {
    //         const errorMessage = screen.getByText(/error fetching data/i);  // Use regex to match the message
    //         expect(errorMessage).toBeInTheDocument();
    //     });
    // });
});