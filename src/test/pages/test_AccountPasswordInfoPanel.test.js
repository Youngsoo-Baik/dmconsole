/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
// import { render } from '@testing-library/react';
// import AccountPasswordInfoPanel from '../../pages/AccountPasswordInfoPanel.js';

// test('AccountPasswordInfoPanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountPasswordInfoPanel from '../../pages/AccountPasswordInfoPanel';
import apiClient from '../../api/apiClient';
// import Config from '../../Config'; // Import Config to mock it

jest.mock('../../api/apiClient');
jest.mock('../../Config', () => ({
    apiUrl: 'http://mocked-api-url', // Set the mock base URL
}));
jest.mock('../../components/CustomTextField', () => (props) => (
    <input
        data-testid={props.id}
        value={props.value}
        onChange={(e) => props.onChange({ target: { name: props.name, value: e.target.value } })}
        placeholder={props.placeholder}
        type={props.type}
    />
));
jest.mock('../../components/CustomDialog', () => (props) => (
    props.open ? (
        <div data-testid="custom-dialog">
            <button onClick={props.handleClose}>Close</button>
            <button onClick={props.onConfirm}>Confirm</button>
        </div>
    ) : null
));

describe('AccountPasswordInfoPanel Component', () => {
    const mockHandleClose = jest.fn();
    const selectedRow = { id: 1, name: 'Test User' };

    beforeEach(() => {
        render(
            <AccountPasswordInfoPanel
                open={true}
                handleClose={mockHandleClose}
                selectedRow={selectedRow}
            />
        );
    });

    test('renders input fields and buttons', () => {
        expect(screen.getByTestId('new_pass')).toBeInTheDocument();
        expect(screen.getByTestId('confirm_pass')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /change/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    test('enables change button with valid matching passwords', async () => {
        fireEvent.change(screen.getByTestId('new_pass'), { target: { value: 'ValidPass123!' } });
        fireEvent.change(screen.getByTestId('confirm_pass'), { target: { value: 'ValidPass123!' } });

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /change/i })).toBeEnabled();
        });
    });

    test('opens confirmation dialog on change button click with valid data', async () => {
        fireEvent.change(screen.getByTestId('new_pass'), { target: { value: 'ValidPass123!' } });
        fireEvent.change(screen.getByTestId('confirm_pass'), { target: { value: 'ValidPass123!' } });

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /change/i })).toBeEnabled();
        });

        fireEvent.click(screen.getByRole('button', { name: /change/i }));
        expect(screen.getByTestId('custom-dialog')).toBeInTheDocument();
    });

    // test('calls API on confirm and handles success', async () => {
    //     apiClient.patch.mockResolvedValueOnce({ status: 200, data: { result: true } });

    //     fireEvent.change(screen.getByTestId('new_pass'), { target: { value: 'ValidPass123!' } });
    //     fireEvent.change(screen.getByTestId('confirm_pass'), { target: { value: 'ValidPass123!' } });

    //     fireEvent.click(screen.getByRole('button', { name: /change/i }));
    //     fireEvent.click(screen.getByTestId('custom-dialog').querySelector('button:nth-of-type(2)')); // Confirm button in dialog

    //     await waitFor(() => {
    //         expect(apiClient.patch).toHaveBeenCalledWith(
    //             `http://mocked-api-url/console/users/1/reset-password`,
    //             { newPassword: 'ValidPass123!', passwordConfirm: 'ValidPass123!' },
    //             { headers: { Authorization: `Bearer null` } }
    //         );
    //         expect(mockHandleClose).toHaveBeenCalled();
    //     });
    // });

    test('displays error message on API failure', async () => {
        const errorMessage = 'Password reset failed';
        apiClient.patch.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });
        global.alert = jest.fn();

        fireEvent.change(screen.getByTestId('new_pass'), { target: { value: 'ValidPass123!' } });
        fireEvent.change(screen.getByTestId('confirm_pass'), { target: { value: 'ValidPass123!' } });

        fireEvent.click(screen.getByRole('button', { name: /change/i }));
        fireEvent.click(screen.getByTestId('custom-dialog').querySelector('button:nth-of-type(2)')); // Confirm button in dialog

        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith(`Error: ${errorMessage}`);
        });
    });
});