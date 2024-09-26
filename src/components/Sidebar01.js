import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, DeviceHub, Storage, AccountBox, ExitToApp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import './Sidebar.css';
import { useTranslation } from 'react-i18next';
import LogoutDialog from './LogoutDialog';  // LogoutDialog 컴포넌트 임포트
import { logout } from '../api/auth'; // auth.js에서 login, logout 함수 가져오기

const SidebarContainer = styled(Box)({
    width: '326px',
    height: '1080px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
});

const Logo = styled('img')({
    width: 150,
    margin: '59px auto 29px',
    display: 'block',
});

const VerticalLine = styled('div')({
    position: 'absolute',
    left: 63, // 수직선의 위치를 아이콘 가운데로 조정
    top: '5%', // 위쪽을 조금 짧게
    bottom: '5%', // 아래쪽을 조금 짧게
    width: 1,
    backgroundColor: '#80befc',
});

const ListContainer = styled(Box)({
    position: 'relative',
    paddingLeft: 0, // 아이콘과 텍스트를 수직선 오른쪽에 위치시키기 위해 패딩 추가
});

const SingleStyledListItem = styled(ListItem)(({ theme, isFirst, isLast }) => ({
    position: 'relative',
    height: 35,
    marginTop: 10,
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 33, // 수직선의 위치를 아이콘 가운데로 조정
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: '#80befc',
    },
}));

const StyledListItem = styled(ListItem)(({ theme, isFirst, isLast }) => ({
    position: 'relative',
    height: 40,
    marginTop: 10,
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 33, // 수직선의 위치를 아이콘 가운데로 조정
        // top:0,
        // bottom: 0,
        // top: isFirst ? '10%' : 0, // 첫 번째 항목의 경우 위쪽을 조금 짧게
        // bottom: isLast ? '10%' : 0, // 마지막 항목의 경우 아래쪽을 조금 짧게
        // height: isFirst || isLast ? '80%' : '100%', // 첫 번째 또는 마지막 항목은 높이를 조정
        width: 1,
        backgroundColor: '#80befc',
    },
}));

const SubListItem = styled(ListItem)({
    // backgroundColor: '#f7f9ff', // 회색 박스
    margin: '-2px 5px -2px 40px', // 리스트 상 우 하 좌 간격
    borderRadius: '5px', // 박스의 모서리를 둥글게
    paddingLeft: 26, // 글자를 더 오른쪽으로 이동
    width: '181px', // 가로 크기
    height: '40px', // 세로 크기
});

function Sidebar({ onLogout }) {
    const [selectedPath, setSelectedPath] = useState(''); // 현재 선택된 경로를 상태로 관리
    const [user, setUser] = useState('admin'); // 현재 로그인된 사용자를 'admin'으로 설정
    const { t } = useTranslation('console');
    const navigate = useNavigate(); // Initialize navigate from useNavigate hook
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const handleLogoutClick = () => {
        setLogoutDialogOpen(true);  // 다이얼로그 열림
    };

    const handleLogoutClose = () => {
        setLogoutDialogOpen(false);  // 다이얼로그 닫힘
    };

    const handleLogoutConfirm = () => {
        setLogoutDialogOpen(false);
        onLogout(); // 부모로부터 받은 로그아웃 함수 호출
        logout(); // auth.js의 logout 함수 호출
        handleMenuClick('/login');   // navigate to login page
        console.log('Logged out');
    };

    const handleMenuClick = (path) => {
        setSelectedPath(path); // 선택된 경로를 상태에 저장
        navigate(path); // Navigate to the specified path
    };

    // ListItem에 동적으로 스타일 적용
    const getListItemStyle = (selectedPath, currentPath) => ({
        backgroundColor: selectedPath === currentPath ? '#F7FBFC' : 'transparent',
        color: selectedPath === currentPath ? '#007dfa' : '#000',
        borderRadius: '8px',
        '&:hover': {
            backgroundColor: selectedPath === currentPath ? '#EBEEF8' : '#f0f4f7',
        },
    });

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <SidebarContainer>
            <Logo src="logo.png" alt="Precision Biosensor Logo" />
            <List sx={{}}>
                <ListItem button sx={{ mt: 2, paddingLeft: '46px' }}>
                    <ListItemIcon>
                        {/* <Home /> */}
                        <img src="/sidebar_home.png" alt="sidebar home" style={{ width: '35px', height: '35px' }} />
                    </ListItemIcon>
                    <ListItemText primary={t('main.sidebar.dashboard')}
                        primaryTypographyProps={{ fontSize: '18px', color: '#007dfa' }}
                    />
                </ListItem>
                <Divider sx={{ width: '300px', marginLeft: '13px', marginTop: '10px' }} />
                <ListItem sx={{ mt: '10px', paddingLeft: '46px' }}>
                    <ListItemIcon>
                        {/* <DeviceHub /> */}
                        <img src="/sidebar_device.png" alt="sidebar device" style={{ width: '35px', height: '35px' }} />
                    </ListItemIcon>
                    <ListItemText primary={t('main.sidebar.customer_device')}
                        primaryTypographyProps={{ fontSize: '18px', fontWeight: '500', color: '#80befc' }}
                    />
                </ListItem>
                <List component="div" disablePadding sx={{ paddingLeft: '32px' }}>
                    <SingleStyledListItem onClick={() => handleMenuClick('customer-devices')}>
                        <SubListItem button sx={{ ...getListItemStyle(selectedPath, 'customer-devices') }}>
                            <ListItemText primary={t('main.sidebar.customer_device_list')}
                                primaryTypographyProps={{ fontSize: '18px', color: '#8b8fa8' }}
                            />
                        </SubListItem>
                    </SingleStyledListItem>
                </List>
                <Divider sx={{ width: '300px', marginLeft: '13px', marginTop: '20px' }} />
                <ListItem sx={{ mt: '10px', paddingLeft: '46px' }}>
                    <ListItemIcon>
                        {/* <DeviceHub /> */}
                        <img src="/sidebar_device.png" alt="sidebar device" style={{ width: '35px', height: '35px' }} />
                    </ListItemIcon>
                    <ListItemText primary={t('main.sidebar.device')}
                        primaryTypographyProps={{ fontSize: '18px', fontWeight: '500', color: '#80befc' }}
                    />
                </ListItem>
                <List component="div" disablePadding sx={{ paddingLeft: '32px' }}>
                    <SingleStyledListItem onClick={() => handleMenuClick('devices')}>
                        <SubListItem button sx={{ ...getListItemStyle(selectedPath, 'devices') }}>
                            <ListItemText primary={t('main.sidebar.device_list')}
                                primaryTypographyProps={{ fontSize: '18px', color: '#8b8fa8' }}
                            />
                        </SubListItem>
                    </SingleStyledListItem>
                </List>
                <Divider sx={{ width: '300px', marginLeft: '13px', marginTop: '20px' }} />
                <ListItem sx={{ mt: 2, paddingLeft: '46px' }}>
                    <ListItemIcon>
                        {/* <Storage /> */}
                        <img src="/sidebar_data.png" alt="sidebar data" style={{ width: '35px', height: '35px' }} />
                    </ListItemIcon>
                    <ListItemText primary={t('main.sidebar.device_data')}
                        primaryTypographyProps={{ fontSize: '18px', fontWeight: '500', color: '#80befc' }}
                    />
                </ListItem>
                <ListContainer>
                    <VerticalLine />
                    <List component="div" disablePadding sx={{ paddingLeft: '32px' }}>
                        <StyledListItem onClick={() => handleMenuClick('analysis-results')}>
                            <SubListItem button sx={{ ...getListItemStyle(selectedPath, 'analysis-results') }}>
                                <ListItemText primary={t('main.sidebar.analysis_result')}
                                    primaryTypographyProps={{ fontSize: '18px', color: '#8b8fa8' }}
                                />
                            </SubListItem>
                        </StyledListItem>
                        <StyledListItem onClick={() => handleMenuClick('qc-results')}>
                            <SubListItem button sx={{ ...getListItemStyle(selectedPath, 'qc-results') }}>
                                <ListItemText primary={t('main.sidebar.qc_result')}
                                    primaryTypographyProps={{ fontSize: '18px', color: '#8b8fa8' }}
                                />
                            </SubListItem>
                        </StyledListItem>
                        <StyledListItem onClick={() => handleMenuClick('qc-materials')}>
                            <SubListItem button sx={{ ...getListItemStyle(selectedPath, 'qc-materials') }}>
                                <ListItemText primary={t('main.sidebar.qc_material')}
                                    primaryTypographyProps={{ fontSize: '18px', color: '#8b8fa8' }}
                                />
                            </SubListItem>
                        </StyledListItem>
                        <StyledListItem onClick={() => handleMenuClick('diag-results')}>
                            <SubListItem button sx={{ ...getListItemStyle(selectedPath, 'diag-results') }}>
                                <ListItemText primary={t('main.sidebar.self_diag')}
                                    primaryTypographyProps={{ fontSize: '18px', color: '#8b8fa8' }}
                                />
                            </SubListItem>
                        </StyledListItem>
                        <StyledListItem onClick={() => handleMenuClick('errors-report')}>
                            <SubListItem button sx={{ ...getListItemStyle(selectedPath, 'errors-report') }}>
                                <ListItemText primary={t('main.sidebar.errors_report')}
                                    primaryTypographyProps={{ fontSize: '18px', color: '#8b8fa8' }}
                                />
                            </SubListItem>
                        </StyledListItem>
                    </List>
                </ListContainer>
                <Divider sx={{ width: '300px', marginLeft: '13px', marginTop: '20px' }} />

                {/* 로그인 계정이 admin인 경우에 계정 관리 메뉴 추가 */}
                {user === 'admin' && (
                    <>
                        <ListItem sx={{ mt: '10px', paddingLeft: '46px' }}>
                            <ListItemIcon>
                                {/* <AccountBox /> */}
                                <img src="/sidebar_account.png" alt="sidebar account" style={{ width: '35px', height: '35px' }} />
                            </ListItemIcon>
                            <ListItemText primary={t('main.sidebar.account')}
                                primaryTypographyProps={{ fontSize: '18px', fontWeight: '500', color: '#80befc' }}
                            />
                        </ListItem>
                        <List component="div" disablePadding sx={{ paddingLeft: '32px' }}>
                            <SingleStyledListItem onClick={() => handleMenuClick('accounts-list')}>
                                <SubListItem button sx={{ ...getListItemStyle(selectedPath, 'account-list') }}>
                                    <ListItemText primary={t('main.sidebar.account_list')}
                                        primaryTypographyProps={{ fontSize: '18px', color: '#8b8fa8' }}
                                    />
                                </SubListItem>
                            </SingleStyledListItem>
                        </List>

                        <Divider sx={{ backgroundColor: 'rgba(245, 245, 247, 0.5)', width: '300px', marginLeft: '13px', marginTop: '20px' }} />
                    </>
                )}

            </List>
            <div className="logout"
                // onClick={() => handleMenuClick('login')}
                onClick={handleLogoutClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <img
                    src={isHovered ? "logout_icon_hover.png" : "logout_icon.png"}
                    alt="Logout"
                />
                <span>{t('main.sidebar.logout')}</span>
            </div>
            {/* LogoutDialog 컴포넌트를 Sidebar 내에 포함 */}
            <LogoutDialog
                open={logoutDialogOpen}
                onClose={handleLogoutClose}
                onLogout={handleLogoutConfirm}
            />
        </SidebarContainer>
    );
};

export default Sidebar;