
// import { render } from '@testing-library/react';
// import LogFilePanel from '../../../pages/DeviceInfo/LogFilePanel.js';

// test('LogFilePanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/DeviceInfo/test_LogFilePanel.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogFilePanel from '../../../pages/DeviceInfo/LogFilePanel';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import * as apiClientModule from '../../../api/apiClient';
import * as tokenModule from '../../../utils/token';

jest.mock('../../../components/CustomColumnSortedAscendingIcon', () => () => <div data-testid="custom-asc-icon" />);
jest.mock('../../../components/CustomColumnSortedDescendingIcon', () => () => <div data-testid="custom-desc-icon" />);

jest.mock('../../../api/apiClient');
jest.mock('../../../utils/token');

describe('LogFilePanel Component', () => {
  beforeEach(() => {
    jest.spyOn(apiClientModule, 'default').mockResolvedValue({
      data: { content: [] },
    });
    jest.spyOn(tokenModule, 'getAccessToken').mockReturnValue('mockToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <LogFilePanel rowId="1" />
      </BrowserRouter>
    );
    expect(screen.getByText(/logfile_tab.title/i)).toBeInTheDocument();
  });

  // test('displays custom ascending/descending icons', async () => {
  //   render(
  //     <BrowserRouter>
  //       <LogFilePanel rowId="1" />
  //     </BrowserRouter>
  //   );

  //   // Check if at least one ascending icon is in the document
  //   const ascendingIcons = screen.getAllByTestId('custom-asc-icon');
  //   expect(ascendingIcons.length).toBeGreaterThan(0);
  //   ascendingIcons.forEach(icon => expect(icon).toBeInTheDocument());

  //   // // Check if at least one descending icon is in the document
  //   // const descendingIcons = screen.getAllByTestId('custom-desc-icon');
  //   // expect(descendingIcons.length).toBeGreaterThan(0);
  //   // descendingIcons.forEach(icon => expect(icon).toBeInTheDocument());
  //   // 비동기 렌더링 확인을 위해 `findByTestId`를 사용
  //   const descendingIcon = await screen.findByTestId("custom-desc-icon");
  //   expect(descendingIcon).toBeInTheDocument();
  // });

  // test('calls the API to fetch device info and log files', async () => {
  //   render(
  //     <BrowserRouter>
  //       <LogFilePanel rowId="1" />
  //     </BrowserRouter>
  //   );

  //   expect(apiClientModule.default).toHaveBeenCalledWith(`${apiClientModule.default.apiUrl}/console/devices/1`, {
  //     headers: { Authorization: `Bearer mockToken` },
  //   });
  // });

  // test('handles pagination and changes page size', async () => {
  //   render(
  //     <BrowserRouter>
  //       <LogFilePanel rowId="1" />
  //     </BrowserRouter>
  //   );

  //   // Locate the pagination select element
  //   const selectBox = screen.getByRole('button', { name: /Showing/i });
  //   fireEvent.mouseDown(selectBox);
  //   fireEvent.click(screen.getByText('20'));

  //   // Verify if pagination updated to 20 rows per page
  //   expect(await screen.findByText('of')).toBeInTheDocument();
  // });

  // test('clicks the download icon button and opens download URL', async () => {
  //   jest.spyOn(window, 'open').mockImplementation(() => { });

  //   render(
  //     <BrowserRouter>
  //       <LogFilePanel rowId="1" />
  //     </BrowserRouter>
  //   );

  //   const downloadButton = await screen.findByLabelText(/management/i);
  //   fireEvent.click(downloadButton);

  //   expect(window.open).toHaveBeenCalled();
  // });
});