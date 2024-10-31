/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// import { render } from '@testing-library/react';
// import AccountMemberInfoPanel from '../../pages/AccountMemberInfoPanel.js';

// test('AccountMemberInfoPanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountMemberInfoPanel from '../../pages/AccountMemberInfoPanel';
import { BrowserRouter } from 'react-router-dom';
import apiClient from '../../api/apiClient';

jest.mock('../../api/apiClient');
jest.mock('../../components/CustomEditTextField', () => (props) => (
    <input
        data-testid={`custom-edit-text-field-${props.id}`}
        value={props.value}
        onChange={(e) => props.onChange({ target: { name: props.name, value: e.target.value } })}
        readOnly={props.readOnly}
    />
));
jest.mock('../../components/CustomImgSelect', () => (props) => (
    <select
        data-testid={`custom-img-select-${props.id}`}
        value={props.value}
        onChange={(e) => props.onChange({ target: { name: props.name, value: e.target.value } })}
    >
        {props.menuItems.map((item) => (
            <option key={item.value} value={item.value}>
                {item.value}
            </option>
        ))}
    </select>
));

describe('AccountMemberInfoPanel Component', () => {
    const mockHandleClose = jest.fn();
    const mockOnDeleteSuccess = jest.fn();
    const selectedRow = { id: 1, name: 'Test User', email: 'testuser@example.com' };

    beforeEach(() => {
        // Mock the apiClient.get method to resolve with expected user data
        apiClient.get.mockResolvedValue({
            data: {
                name: 'Test User',
                email: 'testuser@example.com',
                department: 'Test Department',
                role: 'ADMIN'
            },
        });

        render(
            <BrowserRouter>
                <AccountMemberInfoPanel
                    open={true}
                    handleClose={mockHandleClose}
                    selectedRow={selectedRow}
                    onDeleteSuccess={mockOnDeleteSuccess}
                />
            </BrowserRouter>
        );
    });

    test('renders AccountMemberInfoPanel with the correct fields', async () => {
        // Wait for data to load
        await waitFor(() => {
            expect(screen.getByTestId('custom-edit-text-field-name')).toHaveValue('Test User');
            expect(screen.getByTestId('custom-edit-text-field-department')).toHaveValue('Test Department');
            expect(screen.getByTestId('custom-edit-text-field-email')).toHaveValue('testuser@example.com');
            expect(screen.getByTestId('custom-img-select-grade')).toHaveValue('A');
        });
    });

    // test('submits form data when the modify button is clicked', async () => {
    //     apiClient.patch.mockResolvedValueOnce({ status: 200 });
    //     fireEvent.change(screen.getByTestId('custom-edit-text-field-name'), { target: { value: 'Updated Name' } });
    //     fireEvent.change(screen.getByTestId('custom-edit-text-field-department'), { target: { value: 'Updated Department' } });

    //     fireEvent.click(screen.getByRole('button', { name: /modification/i }));

    //     await waitFor(() => {
    //         expect(apiClient.patch).toHaveBeenCalledWith(
    //             `${apiClient.apiUrl}/console/users/${selectedRow.id}`,
    //             expect.objectContaining({ name: 'Updated Name', department: 'Updated Department' }),
    //             expect.any(Object)
    //         );
    //     });
    // });

    // test('opens delete confirmation dialog and confirms deletion', async () => {
    //     apiClient.delete.mockResolvedValueOnce({ status: 200 });

    //     fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    //     // Simulate confirming the delete dialog
    //     fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    //     await waitFor(() => {
    //         expect(apiClient.delete).toHaveBeenCalledWith(
    //             `${apiClient.apiUrl}/console/users/${selectedRow.id}`,
    //             expect.any(Object)
    //         );
    //         expect(mockOnDeleteSuccess).toHaveBeenCalled();
    //         expect(mockHandleClose).toHaveBeenCalled();
    //     });
    // });

    test('closes the component when cancel button is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
        expect(mockHandleClose).toHaveBeenCalled();
    });
});