module.exports = {
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy', // 스타일 파일을 무시
        '^i18n$': '<rootDir>/src/i18n.js', // i18n 경로를 맞춤
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx'],
    testPathIgnorePatterns: [
        '/node_modules/',         // node_modules는 기본적으로 무시
        '/babel.config.js',       // babel.config.js 파일 무시
        '/jest.config.js',        // jest.config.js 파일 무시
        '/setupTests.js'          // setupTests.js 파일 무시
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',        // 기본적으로 node_modules는 커버리지에서 제외
        '/babel.config.js',      // babel.config.js 파일 제외
        '/jest.config.js',       // jest.config.js 파일 제외
        '/setupTests.js',        // setupTests.js 파일 제외
        '.*\\.config\\.js$',  // 모든 .config.js 파일 제외
      ],
  };