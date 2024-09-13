import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar01';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="main-layout" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ padding: '34px', backgroundColor: 'rgba(235, 238, 248, 0.3)'}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;