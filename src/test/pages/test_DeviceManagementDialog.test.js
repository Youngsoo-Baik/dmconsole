// import { render } from '@testing-library/react';
// import DeviceManagementDialog from '../../pages/DeviceManagementDialog.js';

// test('DeviceManagementDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/test_DeviceManagementDialog.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeviceManagementDialog from '../../pages/DeviceManagementDialog';
import '@testing-library/jest-dom';
// import SystemInfoPanel from '../../pages/DeviceInfo/SystemInfoPanel';
// import LogFilePanel from '../../pages/DeviceInfo/LogFilePanel';
// import PanelInfoPanel from '../../pages/DeviceInfo/PanelInfoPanel';
// import UpdateHistoryPanel from '../../pages/DeviceInfo/UpdateHistoryPanel';
// import InstrumentCoefPanel from '../../pages/DeviceInfo/InstrumentCoefPanel';

jest.mock('../../pages/DeviceInfo/SystemInfoPanel', () => jest.fn(() => <div>System Info Content</div>));
jest.mock('../../pages/DeviceInfo/LogFilePanel', () => jest.fn(() => <div>Log File Content</div>));
jest.mock('../../pages/DeviceInfo/PanelInfoPanel', () => jest.fn(() => <div>Panel Info Content</div>));
jest.mock('../../pages/DeviceInfo/UpdateHistoryPanel', () => jest.fn(() => <div>Update History Content</div>));
jest.mock('../../pages/DeviceInfo/InstrumentCoefPanel', () => jest.fn(() => <div>Instrument Coef Content</div>));

describe('DeviceManagementDialog Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders dialog and close button', () => {
        render(<DeviceManagementDialog open={true} onClose={mockOnClose} rowId={1} />);

        // Verify the dialog is open and close button is visible
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        const closeButton = screen.getByLabelText(/close/i);
        expect(closeButton).toBeInTheDocument();
    });

    test('calls onClose when the close button is clicked', () => {
        render(<DeviceManagementDialog open={true} onClose={mockOnClose} rowId={1} />);

        const closeButton = screen.getByLabelText(/close/i);
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('renders each tab with correct label and navigates between them', async () => {
        render(<DeviceManagementDialog open={true} onClose={mockOnClose} rowId={1} />);

        const tabs = [
            'device_list.system_info_tab.title',
            'device_list.logfile_tab.title',
            'device_list.panel_info_tab.title',
            'device_list.update_history_tab.title',
            'device_list.instrument_coef_tab.title',
        ];

        // Check that each tab is rendered and click through each
        tabs.forEach(async (tab, index) => {
            const tabElement = screen.getByText(new RegExp(tab, 'i'));
            expect(tabElement).toBeInTheDocument();
            fireEvent.click(tabElement);

            await waitFor(() => {
                // Verify the expected content is displayed for each tab
                const expectedContent = [
                    'System Info Content',
                    'Log File Content',
                    'Panel Info Content',
                    'Update History Content',
                    'Instrument Coef Content',
                ][index];
                expect(screen.getByText(expectedContent)).toBeInTheDocument();
            });
        });
    });

    // test('renders SystemInfoPanel by default', () => {
    //     render(<DeviceManagementDialog open={true} onClose={mockOnClose} rowId={1} />);

    //     expect(screen.getByText('System Info Content')).toBeInTheDocument();
    //     expect(SystemInfoPanel).toHaveBeenCalledWith({ rowId: 1 }, {});
    // });
});