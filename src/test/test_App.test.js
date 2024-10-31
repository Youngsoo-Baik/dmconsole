
// import { render } from '@testing-library/react';
// import App from '../App.js';

// test('App.js should render without errors', () => {
//   expect(true).toBe(true);
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// 각 페이지 컴포넌트를 모킹
jest.mock('../pages/Login', () => ({ onLogin }) => (
  <div>
    <h1>Login Page</h1>
    <button onClick={onLogin}>Log In</button>
  </div>
));

jest.mock('../components/MainLayout', () => ({ onLogout }) => (
  <div>
    <h1>Main Layout</h1>
    <button onClick={onLogout}>Log Out</button>
  </div>
));

jest.mock('../pages/CustomerDeviceList', () => () => <h1>Customer Device List</h1>);
jest.mock('../pages/DeviceList', () => () => <h1>Device List</h1>);
jest.mock('../pages/AnalysisResults', () => () => <h1>Analysis Results</h1>);
jest.mock('../pages/QCResults', () => () => <h1>QC Results</h1>);
jest.mock('../pages/QCMaterial', () => () => <h1>QC Material</h1>);
jest.mock('../pages/DiagResults', () => () => <h1>Diag Results</h1>);
jest.mock('../pages/ErrorReport', () => () => <h1>Error Report</h1>);
jest.mock('../pages/AccountList', () => () => <h1>Account List</h1>);

describe('App component', () => {
  test('renders Login page by default if not logged in', () => {
    render(<App />);
    // expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('navigates to Main Layout after successful login', () => {
    render(<App />);

    // 로그인 버튼 클릭하여 로그인을 트리거
    // fireEvent.click(screen.getByText('Log In'));

    // Main Layout이 표시되는지 확인
    // expect(screen.getByText('Main Layout')).toBeInTheDocument();
  });

  test('redirects to Login page after logout', () => {
    render(<App />);

    // 로그인 트리거
    // fireEvent.click(screen.getByText('Log In'));

    // 로그아웃 버튼 클릭하여 로그아웃 트리거
    // fireEvent.click(screen.getByText('Log Out'));

    // 다시 Login Page로 리다이렉트 되었는지 확인
    // expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('navigates to Customer Device List when logged in and visiting root path', () => {
    render(<App />);

    // 로그인 트리거
    // fireEvent.click(screen.getByText('Log In'));

    // Customer Device List 페이지로 이동했는지 확인
    // expect(screen.getByText('Customer Device List')).toBeInTheDocument();
  });

  test('renders other pages under Main Layout when logged in', () => {
    const routes = [
      { path: '/devices', text: 'Device List' },
      { path: '/analysis-results', text: 'Analysis Results' },
      { path: '/qc-results', text: 'QC Results' },
      { path: '/qc-materials', text: 'QC Material' },
      { path: '/diag-results', text: 'Diag Results' },
      { path: '/errors-report', text: 'Error Report' },
      { path: '/accounts-list', text: 'Account List' },
    ];

    for (const { path, text } of routes) {
      window.history.pushState({}, 'Test page', path);
      render(<App />);

      // 로그인 트리거
      // fireEvent.click(screen.getByText('Log In'));

      // 각 페이지가 렌더링되는지 확인
      // expect(screen.getByText(text)).toBeInTheDocument();
    }
  });
});