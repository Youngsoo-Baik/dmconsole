
// import { render } from '@testing-library/react';
// import Config from '../Config.js';

// test('Config.js should render without errors', () => {
//   expect(true).toBe(true);
// });

// import Config from '../Config';

describe('Config module', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv; // 원래 환경으로 복원
    jest.resetModules(); // 모듈 캐시 초기화
  });

  test('loads development configuration by default', () => {
    delete process.env.NODE_ENV; // 기본값 확인을 위해 NODE_ENV 삭제
    jest.resetModules();

    const Config = require('../Config').default;
    expect(Config.apiUrl).toBe(''); // 기본값은 'development' 설정
  });

  test('loads development configuration explicitly', () => {
    process.env.NODE_ENV = 'development';
    jest.resetModules();

    const Config = require('../Config').default;
    expect(Config.apiUrl).toBe('');
  });

  test('loads staging configuration', () => {
    process.env.NODE_ENV = 'staging';
    jest.resetModules();

    const Config = require('../Config').default;
    expect(Config.apiUrl).toBe('/api');
  });

  test('loads production configuration', () => {
    process.env.NODE_ENV = 'production';
    jest.resetModules();

    const Config = require('../Config').default;
    expect(Config.apiUrl).toBe('/api');
  });

  test('loads test configuration', () => {
    process.env.NODE_ENV = 'test';
    jest.resetModules();

    const Config = require('../Config').default;
    expect(Config.apiUrl).toBe(''); // 테스트 환경의 기본값
  });
});
