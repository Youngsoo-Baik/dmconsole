import apiClient from './apiClient';
import { setAccessToken, getRefreshToken, setRefreshToken } from '../utils/token'; // getRefreshToken 추가
import Config from '../Config'; // apiUrl 추가

const apiUrl = Config.apiUrl;

// 로그인 요청
export const login = async (email, password) => {
    const response = await apiClient.post(`${apiUrl}/console/login`, { email, password });

    // 서버에서 받은 Access Token 저장
    setAccessToken(response.data.tokens.accessToken);
    setRefreshToken(response.data.tokens.refreshToken); // Refresh Token 저장

    // Refresh Token은 서버가 HttpOnly Secure 쿠키로 관리하는 것이 바람직
    console.log('로그인 성공:', response.data);
};

// 로그아웃 요청
export const logout = async () => {
    //   await apiClient.post('/auth/logout', {}, { withCredentials: true }); 
    localStorage.removeItem('access_token'); // Access Token 삭제
    localStorage.removeItem('refresh_token'); // Refresh Token 삭제
    console.log('로그아웃 성공');
};

// Refresh Token을 이용해 Access Token 갱신
export const refreshToken = async () => {
    const refreshToken = getRefreshToken(); // 현재 Refresh Token 가져오기

    if (!refreshToken) {
        throw new Error('Refresh Token이 없습니다.');
    }

    // Refresh Token을 요청의 body에 포함하여 새로운 Access Token 요청
    const response = await apiClient.post('/auth/refresh', { refreshToken }, { withCredentials: true });

    const newAccessToken = response.data.accessToken;
    setAccessToken(newAccessToken); // 새로운 Access Token 저장
    //setRefreshToken(response.data.refreshToken); // 새로운 Refresh Token 저장
    return newAccessToken;
};