// Access Token 저장
export const setAccessToken = (token) => {
    localStorage.setItem('access_token', token);
  };
  
  // Access Token 불러오기
  export const getAccessToken = () => {
    return localStorage.getItem('access_token');
  };
  
  // Access Token 삭제
  export const removeAccessToken = () => {
    localStorage.removeItem('access_token');
  };
  
  // Refresh Token 저장
  export const setRefreshToken = (token) => {
    localStorage.setItem('refresh_token', token); // Refresh Token을 localStorage에 저장
  };
  
  // Refresh Token 불러오기
  export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
  };
  
  // Refresh Token 삭제
  export const removeRefreshToken = () => {
    localStorage.removeItem('refresh_token'); // Refresh Token 삭제
  };