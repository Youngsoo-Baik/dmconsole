
// import { render } from '@testing-library/react';
// import PanelInfoPanel from '../../../pages/DeviceInfo/PanelInfoPanel.js';

// test('PanelInfoPanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PanelInfoPanel from '../../../pages/DeviceInfo/PanelInfoPanel';
import { BrowserRouter } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import apiClient from '../../../api/apiClient';
import { getAccessToken } from '../../../utils/token';

// Mock API and token utilities
jest.mock('../../../api/apiClient');
jest.mock('../../../utils/token');

describe('PanelInfoPanel Component', () => {
  const mockRowId = { rowId: '1' };

  beforeEach(() => {
    // Mock API call
    apiClient.get.mockResolvedValueOnce({
      data: { content: [{ panelShortName: 'Aging', version: '3.6', createdAt: '2023-10-23 14:27:09' }] },
    });

    // Mock token retrieval
    getAccessToken.mockReturnValue('mockToken');
  });

  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <PanelInfoPanel {...mockRowId} />
      </BrowserRouter>
    );

    expect(screen.getByAltText('panel icon')).toBeInTheDocument();
  });

  // test('displays data grid with API data', async () => {
  //   render(
  //     <BrowserRouter>
  //       <PanelInfoPanel {...mockRowId} />
  //     </BrowserRouter>
  //   );

  //   // Wait for the DataGrid to load data
  //   await waitFor(() => {
  //     expect(screen.getByText('Aging')).toBeInTheDocument();
  //     expect(screen.getByText('3.6')).toBeInTheDocument();
  //     expect(screen.getByText('2023-10-23 14:27:09')).toBeInTheDocument();
  //   });
  // });

  test('shows pagination controls', async () => {
    render(
      <BrowserRouter>
        <PanelInfoPanel {...mockRowId} />
      </BrowserRouter>
    );

    // Wait for pagination to appear
    await waitFor(() => {
      expect(screen.getByText(/showing/i)).toBeInTheDocument();
    });
  });

  // test('displays custom ascending/descending icons', async () => {
  //   render(
  //     <BrowserRouter>
  //       <PanelInfoPanel {...mockRowId} />
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => {
  //     const ascendingIcons = screen.getAllByTestId('custom-asc-icon');
  //     expect(ascendingIcons.length).toBeGreaterThan(0);
  //     ascendingIcons.forEach(icon => expect(icon).toBeInTheDocument());

  //     const descendingIcons = screen.getAllByTestId('custom-desc-icon');
  //     expect(descendingIcons.length).toBeGreaterThan(0);
  //     descendingIcons.forEach(icon => expect(icon).toBeInTheDocument());
  //   });
  // });
});