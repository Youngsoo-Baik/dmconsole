// import { render } from '@testing-library/react';
// import CustomerDeviceInfoDialog from '../../pages/CustomerDeviceInfoDialog.js';

// test('CustomerDeviceInfoDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerDeviceInfoDialog from '../../pages/CustomerDeviceInfoDialog';
import '@testing-library/jest-dom';
import apiClient from '../../api/apiClient';

jest.mock('../../api/apiClient');

describe('CustomerDeviceInfoDialog Component', () => {
    const mockRowId = 900;
    const mockData = {
        email: 'test@example.com',
        prodName: 'Fluoro Check Heating Block',
        regCode: 'REG12345',
        serial: 'SN98765',
        connectionDate: '2024-01-15',
        registeredAt: '2024-01-01',
        productAt: '2023-12-25',
        country: 'Papua New Guinea',
        manager: 'John Doe',
        reseller: 'Vitaliv Health and Wellness Clinic',
    };

    beforeEach(() => {
        // Reset mocks before each test
        apiClient.get.mockResolvedValue({ data: mockData });
    });

    test('renders dialog with data fetched from API based on rowId', async () => {
        render(<CustomerDeviceInfoDialog open={true} onClose={jest.fn()} rowId={mockRowId} />);

        await waitFor(() => {
            expect(apiClient.get).toHaveBeenCalledWith(`/console/customer-devices/${mockRowId}`);
        });

        // Check if dialog renders data after API call
        expect(await screen.findByText('test@example.com')).toBeInTheDocument();
        expect(screen.getByText('Fluoro Check Heating Block')).toBeInTheDocument();
        expect(screen.getByText('REG12345')).toBeInTheDocument();
        expect(screen.getByText('SN98765')).toBeInTheDocument();
        expect(screen.getByText('2024-01-15')).toBeInTheDocument();
        expect(screen.getByText('2024-01-01')).toBeInTheDocument();
        expect(screen.getByText('2023-12-25')).toBeInTheDocument();
        expect(screen.getByText('Papua New Guinea')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Vitaliv Health and Wellness Clinic')).toBeInTheDocument();
    });

    test('displays "confirm" button and triggers onClose callback on click', async () => {
        const onCloseMock = jest.fn();

        render(<CustomerDeviceInfoDialog open={true} onClose={onCloseMock} rowId={mockRowId} />);

        // Wait for API data to load
        await waitFor(() => {
            expect(screen.getByText('test@example.com')).toBeInTheDocument();
        });

        // Check if the "confirm" button is present and clickable
        const confirmButton = screen.getByRole('button', { name: /confirm/i });
        expect(confirmButton).toBeInTheDocument();
        
        userEvent.click(confirmButton);
        expect(onCloseMock).toHaveBeenCalled();
    });

    test('displays loading state when data is being fetched', () => {
        apiClient.get.mockImplementationOnce(() => new Promise(() => {})); // Mock a delay
        render(<CustomerDeviceInfoDialog open={true} onClose={jest.fn()} rowId={mockRowId} />);

        // Initially, rowData is null, so we expect no content to be displayed
        expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
    });

    test('handles API error gracefully', async () => {
        // Mock API error
        apiClient.get.mockRejectedValueOnce(new Error('API Error'));

        render(<CustomerDeviceInfoDialog open={true} onClose={jest.fn()} rowId={mockRowId} />);

        await waitFor(() => {
            expect(apiClient.get).toHaveBeenCalledWith(`/console/customer-devices/${mockRowId}`);
        });

        // Check that the dialog does not display data on error
        expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
    });
});