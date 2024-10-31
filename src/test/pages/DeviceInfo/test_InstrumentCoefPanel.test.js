
// import { render } from '@testing-library/react';
// import InstrumentCoefPanel from '../../../pages/DeviceInfo/InstrumentCoefPanel.js';

// test('InstrumentCoefPanel.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/pages/DeviceInfo/test_InstrumentCoefPanel.test.js

// src/test/pages/DeviceInfo/test_InstrumentCoefPanel.test.js

// src/test/pages/DeviceInfo/test_InstrumentCoefPanel.test.js

// src/test/pages/DeviceInfo/test_InstrumentCoefPanel.test.js

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import InstrumentCoefPanel from '../../../pages/DeviceInfo/InstrumentCoefPanel';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import * as apiClientModule from '../../../api/apiClient';
import * as tokenModule from '../../../utils/token';

jest.mock('../../../components/CustomColumnSortedAscendingIcon', () => () => <div data-testid="custom-asc-icon" />);
jest.mock('../../../components/CustomColumnSortedDescendingIcon', () => () => <div data-testid="custom-desc-icon" />);

jest.mock('../../../api/apiClient');

describe('InstrumentCoefPanel Component', () => {
  beforeEach(() => {
    apiClientModule.default.mockResolvedValue({
      data: { content: [] },
    });
    jest.spyOn(tokenModule, 'getAccessToken').mockReturnValue('mockToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <BrowserRouter>
          <InstrumentCoefPanel rowId="1" />
        </BrowserRouter>
      );
    });
    expect(screen.getByText(/instrument_coef_tab.title/i)).toBeInTheDocument();
  });

  // test('displays custom ascending/descending icons', async () => {
  //   await act(async () => {
  //     render(
  //       <BrowserRouter>
  //         <InstrumentCoefPanel rowId="1" />
  //       </BrowserRouter>
  //     );
  //   });
  //   expect(screen.getByTestId('custom-asc-icon')).toBeInTheDocument();
  //   expect(screen.getByTestId('custom-desc-icon')).toBeInTheDocument();
  // });

  // test('calls the API to fetch instrument factors', async () => {
  //   await act(async () => {
  //     render(
  //       <BrowserRouter>
  //         <InstrumentCoefPanel rowId="1" />
  //       </BrowserRouter>
  //     );
  //   });
  //   expect(apiClientModule.default).toHaveBeenCalledWith(`${apiClientModule.default.apiUrl}/console/devices/1/inst-factors`, {
  //     headers: { Authorization: `Bearer mockToken` },
  //   });
  // });

  // test('handles pagination and changes page size', async () => {
  //   await act(async () => {
  //     render(
  //       <BrowserRouter>
  //         <InstrumentCoefPanel rowId="1" />
  //       </BrowserRouter>
  //     );
  //   });

  //   // Locate the Select element by the new data-testid
  //   const selectBox = screen.getByTestId('pagination-select');
  //   fireEvent.mouseDown(selectBox); // Open the dropdown
  //   fireEvent.click(screen.getByText('20')); // Select "20"
    
  //   // Check the page size changed to 20 by looking for updated text
  //   await waitFor(() => expect(screen.getByText('of')).toBeInTheDocument());
  // });
});