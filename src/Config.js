const Config = {
    development: {
      apiUrl: ''
    },
    staging: {
      apiUrl: '/api'
    },
    production: {
      apiUrl: '/api'
    }
  };
  
  // 현재 환경을 가져옴 (개발 환경의 경우 기본값은 'development')
  const currentEnv = process.env.NODE_ENV || 'development';
  
  export default Config[currentEnv];