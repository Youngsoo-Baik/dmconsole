import axios from 'axios';
import { getAccessToken, setAccessToken } from '../utils/token';
import { refreshToken } from './auth'; // 토큰 갱신 함수

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: '', // API의 기본 URL
  timeout: 10000, // 요청 타임아웃 설정 (10초)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: Access Token을 Authorization 헤더에 포함
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); // Access Token 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 Access Token 포함
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: Access Token이 만료된 경우 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    try {
      // Access Token 만료 오류 처리 (401 Unauthorized)
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 중복 요청 방지

        try {
          // Refresh Token으로 새로운 Access Token 요청
          const newAccessToken = await refreshToken();

          // 새로운 Access Token 저장
          setAccessToken(newAccessToken);

          // 원래 요청에 새로운 Access Token을 추가해서 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (err) {
          // Refresh Token도 만료된 경우: 로그아웃 처리 등 추가 작업
          console.error('토큰 갱신 실패:', err);
          return Promise.reject(err);
        }
      }

      console.log(`Error ${error.response.status}: ${error.response.data.message || 'An error occurred'}`);

      // 400 Bad Request 처리
      if (error.response && error.response.status === 400) {
        alert(`Error 400: ${error.response.data?.message || 'Bad Request. Please check your input.'}`);
      }

      // 에러 메시지와 상태 코드를 alert 창으로 표시
      // if (error.response) {
      //   alert(`Error ${error.response.status}: ${error.response.data.message || 'An error occurred'}`);
      // } else {
      //   alert('Network error. Please check your internet connection.');
      // }
    } catch (runtimeError) {
      // 런타임 에러 처리
      console.error('Runtime Error:', runtimeError);
      //alert('An unexpected error occurred. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;