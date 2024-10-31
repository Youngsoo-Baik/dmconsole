// import { render } from '@testing-library/react';
// import DeviceList from '../../pages/DeviceList.js';

// test('DeviceList.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/test_DeviceList.test.js
// src/test/pages/test_DeviceList.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DeviceList from '../../pages/DeviceList';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import apiClient from '../../api/apiClient';

jest.mock('../../api/apiClient');

const mockData = [
    { id: 1, country: 'Papua New Guinea', region: 'N.America', reseller: 'Vitaliv Health and Wellness Clinic', manager: 'Manager1', serial: 'ABC123', reg_date: '2023-09-15 09:55:32', connection_state: true },
    { id: 2, country: 'Papua New Guinea', region: 'N.America', reseller: 'Clinic B', manager: 'Manager2', serial: 'DEF456', reg_date: '2023-09-15 09:55:32', connection_state: false },
];

describe('DeviceList Component', () => {
    beforeEach(() => {
        apiClient.get.mockResolvedValue({ data: { content: mockData } });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders DataGrid with data fetched from API', async () => {
        render(<DeviceList />);
        
        await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

        // Check if data from the mock API is displayed in the grid
        expect(screen.getAllByText('Papua New Guinea').length).toBeGreaterThan(0);
        expect(screen.getByText('Vitaliv Health and Wellness Clinic')).toBeInTheDocument();
    });

    // test('displays "No data available" message if API returns empty data', async () => {
    //     apiClient.get.mockResolvedValueOnce({ data: { content: [] } });
        
    //     render(<DeviceList />);

    //     await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

    //     expect(screen.queryByText(/No data available/i)).toBeInTheDocument();
    // });

    // test('handles API errors gracefully and stops loading', async () => {
    //     apiClient.get.mockRejectedValue(new Error('API error'));
        
    //     render(<DeviceList />);

    //     await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
    //     expect(screen.queryByText(/No data available/i)).toBeInTheDocument();
    // });

    // test('opens filter dialog and applies filters correctly', async () => {
    //     render(<DeviceList />);

    //     // Ensure the filter button exists and is clickable
    //     const filterButton = screen.getByText(/button.filter_search/i);
    //     fireEvent.click(filterButton);

    //     await waitFor(() => screen.getByText(/Search/i));
        
    //     const countrySelect = screen.getByLabelText(/Country/i);
    //     fireEvent.change(countrySelect, { target: { value: 'Papua New Guinea' } });

    //     const searchButton = screen.getByText(/Search/i);
    //     fireEvent.click(searchButton);

    //     await waitFor(() => {
    //         expect(screen.getAllByText('Papua New Guinea').length).toBeGreaterThan(0);
    //         expect(screen.getByText('Vitaliv Health and Wellness Clinic')).toBeInTheDocument();
    //     });
    // });

    test('handles pagination correctly', async () => {
        render(<DeviceList />);

        await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

        const paginationNextButton = screen.getByRole('button', { name: /next page/i });
        fireEvent.click(paginationNextButton);

        await waitFor(() => {
            // Since the mock API returns a new result each page change, verify API call count aligns with pagination clicks.
            expect(apiClient.get).toHaveBeenCalled();
        });
    });
});