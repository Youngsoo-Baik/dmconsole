
// import { render } from '@testing-library/react';
// import token from '../../utils/token.js';

// test('token.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import { 
  setAccessToken, 
  getAccessToken, 
  removeAccessToken, 
  setRefreshToken, 
  getRefreshToken, 
  removeRefreshToken 
} from '../../utils/token';

describe('token module', () => {
  beforeEach(() => {
    // 각 테스트 전에 localStorage를 초기화합니다.
    localStorage.clear();
  });

  describe('Access Token functions', () => {
    test('setAccessToken stores the access token in localStorage', () => {
      const accessToken = 'testAccessToken';
      setAccessToken(accessToken);
      expect(localStorage.getItem('access_token')).toBe(accessToken);
    });

    test('getAccessToken retrieves the access token from localStorage', () => {
      const accessToken = 'testAccessToken';
      localStorage.setItem('access_token', accessToken);
      expect(getAccessToken()).toBe(accessToken);
    });

    test('removeAccessToken removes the access token from localStorage', () => {
      localStorage.setItem('access_token', 'testAccessToken');
      removeAccessToken();
      expect(localStorage.getItem('access_token')).toBeNull();
    });
  });

  describe('Refresh Token functions', () => {
    test('setRefreshToken stores the refresh token in localStorage', () => {
      const refreshToken = 'testRefreshToken';
      setRefreshToken(refreshToken);
      expect(localStorage.getItem('refresh_token')).toBe(refreshToken);
    });

    test('getRefreshToken retrieves the refresh token from localStorage', () => {
      const refreshToken = 'testRefreshToken';
      localStorage.setItem('refresh_token', refreshToken);
      expect(getRefreshToken()).toBe(refreshToken);
    });

    test('removeRefreshToken removes the refresh token from localStorage', () => {
      localStorage.setItem('refresh_token', 'testRefreshToken');
      removeRefreshToken();
      expect(localStorage.getItem('refresh_token')).toBeNull();
    });
  });
});