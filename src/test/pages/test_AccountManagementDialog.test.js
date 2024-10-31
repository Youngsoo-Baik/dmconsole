/* eslint-disable testing-library/no-render-in-setup */

// import { render } from '@testing-library/react';
// import AccountManagementDialog from '../../pages/AccountManagementDialog.js';

// test('AccountManagementDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountManagementDialog from '../../pages/AccountManagementDialog';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../pages/AccountMemberInfoPanel', () => () => <div>Account Member Info Panel</div>);
jest.mock('../../pages/AccountPasswordInfoPanel', () => () => <div>Account Password Info Panel</div>);

describe('AccountManagementDialog Component', () => {
    const mockHandleClose = jest.fn();
    const mockOnListRefresh = jest.fn();
    const selectedRow = { id: 1, name: 'Test User', email: 'testuser@example.com' };

    beforeEach(() => {
        render(
            <BrowserRouter>
                <AccountManagementDialog
                    open={true}
                    handleClose={mockHandleClose}
                    selectedRow={selectedRow}
                    onListRefresh={mockOnListRefresh}
                />
            </BrowserRouter>
        );
    });

    test('renders AccountManagementDialog with Account Member Info Panel by default', () => {
        expect(screen.getByText('Account Member Info Panel')).toBeInTheDocument();
    });

    test('switches to Account Password Info Panel when the second tab is clicked', () => {
        const passwordTab = screen.getByRole('tab', { name: /pass_mod_dialog.title/i });
        fireEvent.click(passwordTab);
        expect(screen.getByText('Account Password Info Panel')).toBeInTheDocument();
    });

    test('closes the dialog when the close button is clicked', () => {
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });

    // test('calls onListRefresh when delete success is triggered in AccountMemberInfoPanel', () => {
    //     const accountMemberInfoPanel = screen.getByText('Account Member Info Panel');
    //     fireEvent.delete(accountMemberInfoPanel);
    //     expect(mockOnListRefresh).toHaveBeenCalledTimes(1);
    // });
});