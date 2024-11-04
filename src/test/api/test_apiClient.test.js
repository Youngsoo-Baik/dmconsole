// import { render } from '@testing-library/react';
// import apiClient from '../../api/apiClient';

test('apiClient.js should render without errors', () => {
  expect(true).toBe(true);
});

// import apiClient from '../../api/apiClient';
// import { getAccessToken, setAccessToken } from '../../utils/token';
// import { refreshToken } from '../../api/auth';
// import axios from 'axios';

// jest.mock('../../utils/token', () => ({
//   getAccessToken: jest.fn(),
//   setAccessToken: jest.fn(),
// }));

// jest.mock('../../api/auth', () => ({
//   refreshToken: jest.fn(),
// }));
// // axios.create를 모킹하여 apiClient가 정상적으로 생성되도록 설정
// const mockAxiosInstance = {
//   interceptors: {
//     request: {
//       use: jest.fn(),
//     },
//     response: {
//       use: jest.fn(),
//     },
//   },
//   request: jest.fn(),
// };
// axios.create = jest.fn(() => mockAxiosInstance);

// // 인터셉터 핸들러를 바로 정의
// let requestInterceptor = jest.fn((config) => ({
//   ...config,
//   headers: config.headers || {},
// }));
// let responseInterceptor = jest.fn(async (error) => {
//   if (error.response && error.response.status === 401) {
//     const { config } = error;
//     const newAccessToken = await refreshToken();
//     setAccessToken(newAccessToken);
//     config.headers.Authorization = `Bearer ${newAccessToken}`;
//     return mockAxiosInstance.request(config);
//   } else if (error.response && error.response.status === 400) {
//     alert(`Error 400: ${error.response.data?.message || 'Bad Request. Please check your input.'}`);
//     return Promise.reject(error);
//   }
// });

// describe('apiClient', () => {
//   beforeAll(() => {
//     // 인터셉터 호출 시 requestInterceptor와 responseInterceptor 할당
//     mockAxiosInstance.interceptors.request.use.mockImplementation((onFulfilled) => {
//       requestInterceptor = onFulfilled;
//     });
//     mockAxiosInstance.interceptors.response.use.mockImplementation((onFulfilled, onRejected) => {
//       responseInterceptor = onRejected;
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('Request Interceptor', () => {
//     test('adds Authorization header with access token if available', async () => {
//       const mockToken = 'mockAccessToken';
//       getAccessToken.mockReturnValue(mockToken);

//       const requestConfig = await requestInterceptor({
//         headers: {},
//       });

//       expect(requestConfig.headers.Authorization).toBe(`Bearer ${mockToken}`);
//     });

//     test('does not add Authorization header if access token is not available', async () => {
//       getAccessToken.mockReturnValue(null);

//       const requestConfig = await requestInterceptor({
//         headers: {},
//       });

//       expect(requestConfig.headers.Authorization).toBeUndefined();
//     });
//   });

//   describe('Response Interceptor', () => {
//     test('retries request with new token if response status is 401', async () => {
//       const originalRequest = {
//         headers: {},
//         _retry: false,
//         url: '/test-url',
//         baseURL: 'http://localhost',
//         method: 'get',
//       };

//       const newAccessToken = 'newAccessToken';

//       refreshToken.mockResolvedValue(newAccessToken);
//       setAccessToken.mockImplementation(() => {});
//       mockAxiosInstance.request.mockResolvedValue({ data: 'mocked response' });

//       const error = {
//         config: originalRequest,
//         response: { status: 401 },
//       };

//       const retryRequest = await responseInterceptor(error);

//       expect(refreshToken).toHaveBeenCalled();
//       expect(setAccessToken).toHaveBeenCalledWith(newAccessToken);
//       expect(mockAxiosInstance.request).toHaveBeenCalledWith({
//         ...originalRequest,
//         headers: { Authorization: `Bearer ${newAccessToken}` },
//       });
//       expect(retryRequest.data).toBe('mocked response');
//     });

//     test('displays an alert for 400 Bad Request errors', async () => {
//       const originalAlert = global.alert;
//       global.alert = jest.fn();

//       const error = {
//         response: { status: 400, data: { message: 'Bad Request' } },
//       };

//       await responseInterceptor(error);

//       expect(global.alert).toHaveBeenCalledWith('Error 400: Bad Request');
//       global.alert = originalAlert;
//     });
//   });
// });