import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
// eslint-disable-next-line no-unused-vars
import i18n from './i18n';
import CustomerDeviceList from './pages/CustomerDeviceList';
import DeviceList from './pages/DeviceList';
import AnalysisResults from './pages/AnalysisResults';
import QCResults from './pages/QCResults';
import QCMaterial from './pages/QCMaterial';
import DiagResults from './pages/DiagResults';
import ErrorReport from './pages/ErrorReport';
import AccountList from './pages/AccountList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* 로그인 상태에 따라 메인 레이아웃으로 이동 */}
        <Route path="/" element={isLoggedIn ? <MainLayout onLogout={handleLogout} /> : <Navigate to="/login" />}>
          {/* <Route path="/" element={<MainLayout/>}> */}
          <Route index element={<Navigate to="customer-devices" />} />
          <Route path="customer-devices" element={<CustomerDeviceList />} />
          <Route path="devices" element={<DeviceList />} />
          <Route path="analysis-results" element={<AnalysisResults />} />
          <Route path="qc-results" element={<QCResults />} />
          <Route path="qc-materials" element={<QCMaterial />} />
          <Route path="diag-results" element={<DiagResults />} />
          <Route path="errors-report" element={<ErrorReport />} />
          <Route path="accounts-list" element={<AccountList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;