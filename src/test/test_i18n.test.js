
// import { render } from '@testing-library/react';
// import i18n from '../i18n.js';

// test('i18n.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import i18n from '../i18n'; // src/i18.js
import apiClient from '../api/apiClient';
import Config from '../Config';
import { getAccessToken } from '../utils/token';

jest.mock('../api/apiClient', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })), // get 메서드가 Promise를 반환하도록 모의 설정
}));
jest.mock('../Config', () => ({
  apiUrl: '/mockApi/',
}));
jest.mock('../utils/token', () => ({
  getAccessToken: jest.fn(() => 'mockAccessToken'),
}));

describe('i18n configuration', () => {
  beforeAll(async () => {
    await i18n.init(); // i18n 명시적 초기화
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes i18n with default language and settings', () => {
    expect(i18n.language).toBe('ko');
    expect(i18n.options.fallbackLng).toEqual(['ko']); // 배열 형태로 확인
    expect(i18n.options.interpolation.escapeValue).toBe(false);
  });

  test('uses API path if API call is successful', async () => {
    apiClient.get.mockResolvedValueOnce({ data: {} }); // 성공적인 API 호출을 위한 모킹

    const loadPath = await i18n.options.backend.loadPath('en', 'translation');

    expect(loadPath).toBe('/mockApi/console/i18n/en/translation.json');
    expect(apiClient.get).toHaveBeenCalledWith('/mockApi/console/i18n/en/translation.json', {
      headers: { Authorization: 'Bearer mockAccessToken' },
    });
  });

  test('uses local path if API call fails', async () => {
    apiClient.get.mockRejectedValueOnce(new Error('API error')); // API 호출 실패를 위한 모킹

    const loadPath = await i18n.options.backend.loadPath('en', 'translation');

    expect(loadPath).toBe('/locales/en/translation.json');
    expect(apiClient.get).toHaveBeenCalledWith('/mockApi/console/i18n/en/translation.json', {
      headers: { Authorization: 'Bearer mockAccessToken' },
    });
  });
});