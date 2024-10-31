
// import { render } from '@testing-library/react';
// import Header from '../../components/Header.js';

// test('Header.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../../components/Header';
import apiClient from '../../api/apiClient';
import { useTranslation } from 'react-i18next';

// Mock API client
jest.mock('../../api/apiClient');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // t 함수 모킹
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('Header Component', () => {
  const mockEmail = 'test@example.com';

  beforeEach(() => {
    // Mock API response
    apiClient.get.mockResolvedValue({
      data: { email: mockEmail },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders header title and email', async () => {
    render(<Header />);
    
    // 타이틀이 올바르게 렌더링되는지 확인
    expect(screen.getByText('main.header.title')).toBeInTheDocument();
    
    // 이메일 로딩
    await waitFor(() => {
      expect(screen.getByText(mockEmail)).toBeInTheDocument();
    });
  });

  // test('renders language dropdown and changes language', async () => {
  //   render(<Header />);

  //   // 언어 드롭다운이 렌더링되는지 확인
  //   const languageIcon = screen.getByAltText('Language Icon');
  //   expect(languageIcon).toBeInTheDocument();

  //   const dropdown = screen.getByRole('button', { name: /한국어/i });
  //   expect(dropdown).toBeInTheDocument();

  //   // 드롭다운 클릭 후, 언어 변경 확인
  //   fireEvent.mouseDown(dropdown);
  //   const englishOption = await screen.findByText('English');
  //   fireEvent.click(englishOption);

  //   // 언어 변경 함수가 호출되었는지 확인
  //   const { i18n } = useTranslation();
  //   await waitFor(() => {
  //     expect(i18n.changeLanguage).toHaveBeenCalledWith('en');
  //   });
  // });

  // test('displays custom icons correctly', () => {
  //   render(<Header />);
    
  //   // 커스텀 화살표 및 선택된 언어 체크 아이콘이 올바르게 렌더링되는지 확인
  //   expect(screen.getByAltText('Custom Arrow Down')).toBeInTheDocument();
  //   expect(screen.getByAltText('Selected Icon')).toBeInTheDocument();
  // });
});