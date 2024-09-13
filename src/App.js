import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar01';
import DeviceTable from './components/DeviceTable02';
import Header from './components/Header';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import i18n from './i18n';
import CustomerDeviceList from './pages/CustomerDeviceList';
// import DeviceList from './pages/DeviceList';
// import DeviceList from './components/DeviceTable02';
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

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* <Route path="/" element={isLoggedIn ? <MainLayout /> : <Navigate to="/login" />}> */}
        <Route path="/" element={<MainLayout/>}>
          <Route  path="/devicetable" element={<DeviceTable />} />
          {/* <Route index element={<Home />} /> */}
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