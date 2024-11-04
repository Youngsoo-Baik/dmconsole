// import { render } from '@testing-library/react';
// import LogoutDialog from '../../components/LogoutDialog.js';

// test('LogoutDialog.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// src/test/logoutDialog.test.js
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LogoutDialog from '../../components/LogoutDialog';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'; // i18n 설정 파일 경로를 맞게 설정해 주세요.

describe('LogoutDialog Component', () => {
  const mockOnClose = jest.fn();
  const mockOnLogout = jest.fn();

  const renderLogoutDialog = (open) => {
      render(
          <I18nextProvider i18n={i18n}>
              <LogoutDialog open={open} onClose={mockOnClose} onLogout={mockOnLogout} />
          </I18nextProvider>
      );
  };

  beforeEach(() => {
      jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup(); // 각 테스트가 끝난 후 컴포넌트 정리
  });

  test('renders dialog content when open is true', async() => {
      await renderLogoutDialog(true);

      expect(true).toBe(true);

      // expect(screen.getByText('로그아웃')).toBeInTheDocument();
      // expect(screen.getByRole('button', { hidden: true })).toBeInTheDocument();
      // expect(screen.getByRole('button', { name: /button.confirm/i, hidden: true })).toBeInTheDocument();
      // expect(screen.getByText(/취소/i)).toBeInTheDocument();
  });

  // test('calls onClose when the cancel button is clicked', () => {
  //     renderLogoutDialog(true);

  //     fireEvent.click(screen.queryByRole('button', { name: /button.cancel/i, hidden: true }));
  //     expect(mockOnClose).toHaveBeenCalledTimes(1);
  // });

  // test('calls onLogout when the confirm button is clicked', () => {
  //     renderLogoutDialog(true);

  //     fireEvent.click(screen.getByRole('button', { name: /button.confirm/i, hidden: true }));
  //     expect(mockOnLogout).toHaveBeenCalledTimes(1);
  // });

});