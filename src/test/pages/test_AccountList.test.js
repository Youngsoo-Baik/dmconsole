
// import { render } from '@testing-library/react';
// import AccountList from '../../pages/AccountList.js';

// test('AccountList.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountList from '../../pages/AccountList';
import { BrowserRouter } from 'react-router-dom';
import apiClient from '../../api/apiClient';

jest.mock('../../api/apiClient');
jest.mock('../../utils/token', () => ({
    getAccessToken: jest.fn(() => 'mockToken'),
}));

describe('AccountList Component', () => {
    beforeEach(() => {
        apiClient.get.mockResolvedValue({
            data: {
                content: [
                    {
                        id: 1,
                        name: 'Hong Gil Dong',
                        email: 'platformsw@precision-bio.com',
                        department: '디지털헬스케어개발팀',
                        role: 'ADMIN',
                    },
                ],
            },
        });
    });

    test('renders loading indicator while data is fetching', async () => {
        render(
            <BrowserRouter>
                <AccountList />
            </BrowserRouter>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
    });

    test('renders account data after loading', async () => {
        render(
            <BrowserRouter>
                <AccountList />
            </BrowserRouter>
        );

        // eslint-disable-next-line testing-library/prefer-find-by
        await waitFor(() => expect(screen.getByText('Hong Gil Dong')).toBeInTheDocument());
        expect(screen.getByText('platformsw@precision-bio.com')).toBeInTheDocument();
        expect(screen.getByText('디지털헬스케어개발팀')).toBeInTheDocument();
    });

    // test('opens the AccountCreateDialog when "Add Member" button is clicked', async () => {
    //     render(
    //         <BrowserRouter>
    //             <AccountList />
    //         </BrowserRouter>
    //     );

    //     await waitFor(() => expect(screen.getByText('Hong Gil Dong')).toBeInTheDocument());
    //     fireEvent.click(screen.getByRole('button', { name: /add member/i }));
    //     expect(screen.getByText('Account Create Dialog Title')).toBeInTheDocument();
    // });

    // test('opens the AccountManagementDialog when management icon is clicked', async () => {
    //     render(
    //         <BrowserRouter>
    //             <AccountList />
    //         </BrowserRouter>
    //     );

    //     await waitFor(() => expect(screen.getByText('Hong Gil Dong')).toBeInTheDocument());

    //     const manageButton = screen.getAllByRole('button')[0]; // Adjust to select the management icon button
    //     fireEvent.click(manageButton);
    //     expect(screen.getByText('Account Management Dialog Title')).toBeInTheDocument();
    // });
});