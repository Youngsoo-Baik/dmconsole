import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Drawer, IconButton } from '@mui/material';
import { Home, DeviceHub, Storage, AccountBox, ExitToApp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';
import './Sidebar.css';
import { useTranslation } from 'react-i18next';
import LogoutDialog from './LogoutDialog'; // LogoutDialog 컴포넌트 임포트

const drawerWidth = 326;

const SidebarContainer = styled(Box)(() => ({
  width: drawerWidth,
  height: '100vh',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
}));

const Logo = styled('img')({
  width: 150,
  margin: '59px auto 29px',
  display: 'block',
});

const ListContainer = styled(Box)(() => ({
  position: 'relative',
  paddingLeft: 0,
}));

function SidebarResponsive({ onLogout }) {
  const [selectedPath, setSelectedPath] = useState(''); // 현재 선택된 경로를 상태로 관리
  const [user, setUser] = useState('admin'); // 현재 로그인된 사용자를 'admin'으로 설정
  const { t } = useTranslation('console');
  const navigate = useNavigate(); // Initialize navigate from useNavigate hook
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 모바일 화면 여부 체크

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true); // 다이얼로그 열림
  };

  const handleLogoutClose = () => {
    setLogoutDialogOpen(false); // 다이얼로그 닫힘
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    onLogout(); // 부모로부터 받은 로그아웃 함수 호출
    handleMenuClick('/login'); // navigate to login page
    console.log('Logged out');
  };

  const handleMenuClick = (path) => {
    setSelectedPath(path); // 선택된 경로를 상태에 저장
    navigate(path); // Navigate to the specified path
  };

  const getListItemStyle = (selectedPath, currentPath) => ({
    backgroundColor: selectedPath === currentPath ? '#F7FBFC' : 'transparent',
    color: selectedPath === currentPath ? '#007dfa' : '#000',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: selectedPath === currentPath ? '#EBEEF8' : '#f0f4f7',
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen); // 모바일 메뉴 토글
  };

  const drawerContent = (
    <SidebarContainer>
      <Logo src="logo.png" alt="Precision Biosensor Logo" />
      <List>
        {/* 사이드바 메뉴 아이템들 */}
        <ListItem button sx={{ mt: 2, paddingLeft: '46px' }} onClick={() => handleMenuClick('/')}>
          <ListItemIcon>
            <img src="/sidebar_home.png" alt="sidebar home" style={{ width: '35px', height: '35px' }} />
          </ListItemIcon>
          <ListItemText
            primary={t('main.sidebar.dashboard')}
            primaryTypographyProps={{ fontSize: '18px', color: '#007dfa' }}
          />
        </ListItem>
        <Divider sx={{ width: '300px', marginLeft: '13px', marginTop: '10px' }} />
        <ListItem button sx={{ mt: '10px', paddingLeft: '46px' }} onClick={() => handleMenuClick('/devices')}>
          <ListItemIcon>
            <img src="/sidebar_device.png" alt="sidebar device" style={{ width: '35px', height: '35px' }} />
          </ListItemIcon>
          <ListItemText
            primary={t('main.sidebar.customer_device')}
            primaryTypographyProps={{ fontSize: '18px', fontWeight: '500', color: '#80befc' }}
          />
        </ListItem>
        <Divider sx={{ width: '300px', marginLeft: '13px', marginTop: '10px' }} />
        {/* 추가적인 사이드바 메뉴들 */}
      </List>
      <div className="logout" onClick={handleLogoutClick}>
        <img src="logout_icon.png" alt="Logout" />
        <span>{t('main.sidebar.logout')}</span>
      </div>
      <LogoutDialog open={logoutDialogOpen} onClose={handleLogoutClose} onLogout={handleLogoutConfirm} />
    </SidebarContainer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      )}
      {/* 모바일 Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // 모바일 성능 향상
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* 데스크탑 Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default SidebarResponsive;
