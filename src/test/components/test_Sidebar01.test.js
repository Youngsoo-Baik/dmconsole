
// import { render } from '@testing-library/react';
// import Sidebar01 from '../../components/Sidebar01.js';

// test('Sidebar01.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '../../components/Sidebar01';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import apiClient from '../../api/apiClient';
import Config from '../../Config';

// Mocks
jest.mock('../../api/apiClient');
jest.mock('../../api/auth', () => ({
  logout: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // t 함수 모킹
  }),
}));

describe('Sidebar Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    apiClient.get.mockResolvedValue({
      data: { role: 'ADMIN' },
    });
  });

  test('renders Sidebar with default elements', async () => {
    render(
      <MemoryRouter>
        <Sidebar onLogout={mockLogout} />
      </MemoryRouter>
    );

    // 로고, 기본 메뉴 항목 렌더링 확인
    expect(screen.getByAltText('Precision Biosensor Logo')).toBeInTheDocument();
    expect(screen.getByText('main.sidebar.dashboard')).toBeInTheDocument();
    expect(screen.getByText('main.sidebar.customer_device')).toBeInTheDocument();
  });

  test('shows admin menu items if user role is ADMIN', async () => {
    render(
      <MemoryRouter>
        <Sidebar onLogout={mockLogout} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('main.sidebar.account')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('main.sidebar.account_list')).toBeInTheDocument();
    });
  });

  // test('handles menu item click and changes selected path', async () => {
  //   render(
  //     <MemoryRouter>
  //       <Sidebar onLogout={mockLogout} />
  //     </MemoryRouter>
  //   );

  //   // 'customer-devices' 메뉴 아이템 클릭
  //   fireEvent.click(screen.getByText('main.sidebar.customer_device_list'));
  //   await waitFor(() => {
  //     expect(screen.getByText('main.sidebar.customer_device_list').closest('div')).toHaveStyle('background-color: #F7FBFC');
  //   });
  // });

  // test('opens and closes LogoutDialog when logout is clicked', async () => {
  //   render(
  //     <MemoryRouter>
  //       <Sidebar onLogout={mockLogout} />
  //     </MemoryRouter>
  //   );

  //   // 로그아웃 아이콘 클릭 시 다이얼로그 열기
  //   const logoutIcon = screen.getByText('main.sidebar.logout');
  //   fireEvent.click(logoutIcon);
  //   expect(screen.getByRole('dialog')).toBeInTheDocument();

  //   // 다이얼로그 닫기
  //   fireEvent.click(screen.getByText('Cancel'));
  //   await waitFor(() => {
  //     expect(screen.queryByRole('dialog')).toBeNull();
  //   });
  // });

  // test('calls logout function and navigates to login page on logout confirmation', async () => {
  //   render(
  //     <MemoryRouter>
  //       <Sidebar onLogout={mockLogout} />
  //     </MemoryRouter>
  //   );

  //   // 로그아웃 아이콘 클릭 시 다이얼로그 열기
  //   const logoutIcon = screen.getByText('main.sidebar.logout');
  //   fireEvent.click(logoutIcon);

  //   // 로그아웃 확인 클릭
  //   fireEvent.click(screen.getByText('Confirm'));
  //   await waitFor(() => {
  //     expect(mockLogout).toHaveBeenCalled();
  //   });
  // });
});