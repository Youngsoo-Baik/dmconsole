
// import { render } from '@testing-library/react';
// import auth from '../../api/auth';

// test('auth.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import { login, logout, refreshToken } from '../../api/auth';
import apiClient from '../../api/apiClient';
import { setAccessToken, setRefreshToken, getRefreshToken } from '../../utils/token';
import Config from '../../Config'; // apiUrl 추가

const apiUrl = Config.apiUrl;

// Mocks
jest.mock('../../api/apiClient');
jest.mock('../../utils/token', () => ({
  setAccessToken: jest.fn(),
  setRefreshToken: jest.fn(),
  getRefreshToken: jest.fn(),
}));

describe('Auth module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login function', () => {
    test('calls API and stores tokens on successful login', async () => {
      const mockResponse = {
        data: {
          tokens: {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
          },
        },
      };
      
      apiClient.post.mockResolvedValue(mockResponse);

      await login('test@example.com', 'password123');

      expect(apiClient.post).toHaveBeenCalledWith(`${Config.apiUrl}/console/login`, {
        email: 'test@example.com',
        password: 'password123',
      });

      expect(setAccessToken).toHaveBeenCalledWith('mockAccessToken');
      expect(setRefreshToken).toHaveBeenCalledWith('mockRefreshToken');
    });
  });

  describe('logout function', () => {
    beforeEach(() => {
        // localStorage를 모의 객체로 설정
        Object.defineProperty(window, 'localStorage', {
            value: {
                removeItem: jest.fn(),
                setItem: jest.fn(),
                getItem: jest.fn(),
            },
            writable: true,
        });
    });

    test('removes tokens from local storage on logout', () => {
        logout();

        expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
        expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    });
});

  describe('refreshToken function', () => {
    test('throws an error if no refresh token is present', async () => {
      getRefreshToken.mockReturnValue(null);

      await expect(refreshToken()).rejects.toThrow('Refresh Token이 없습니다.');
    });

    test('calls API and updates access token on successful refresh', async () => {
      const mockRefreshToken = 'mockRefreshToken';
      const mockNewAccessToken = 'mockNewAccessToken';
      
      getRefreshToken.mockReturnValue(mockRefreshToken);
      apiClient.post.mockResolvedValue({
        data: { accessToken: mockNewAccessToken },
      });

      const newAccessToken = await refreshToken();

      expect(apiClient.post).toHaveBeenCalledWith('/auth/refresh', { refreshToken: mockRefreshToken }, { withCredentials: true });
      expect(setAccessToken).toHaveBeenCalledWith(mockNewAccessToken);
      expect(newAccessToken).toBe(mockNewAccessToken);
    });
  });
});
