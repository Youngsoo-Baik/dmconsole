const Config = {
    development: {
      apiUrl: ''
    },
    staging: {
      apiUrl: '/api'
    },
    production: {
      apiUrl: '/api'
    },
    test: { // 테스트 환경에 대한 설정 추가
      apiUrl: ''  // 예를 들어 테스트 환경에 대한 URL 설정
    }
  };
  
  // 현재 환경을 가져옴 (개발 환경의 경우 기본값은 'development')
  const currentEnv = process.env.NODE_ENV || 'development';
  
  export default Config[currentEnv];