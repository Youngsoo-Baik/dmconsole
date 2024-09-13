import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, Home, DeviceHub, Storage, AccountBox, ExitToApp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SidebarContainer = styled(Box)({
  width: 326,
  height: '100vh',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  position: 'relative',
});

const Logo = styled('img')({
  width: 150,
  margin: '35px auto 29px',
  display: 'block',
});

const StyledListItem = styled(ListItem)({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 27, // 수직선의 위치를 아이콘 가운데로 조정
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#e0e0e0',
  },
});

const SubListItem = styled(ListItem)({
  // marginLeft: 100, // 하위 리스트 항목들을 더 오른쪽으로 이동
  backgroundColor: '#f0f0f0', // 회색 박스
  margin: '1px 5px 1px 25px', // 리스트 상 우 하 좌 간격
  borderRadius: '5px', // 박스의 모서리를 둥글게
  paddingLeft: 26, // 글자를 더 오른쪽으로 이동
});

const Sidebar = () => {
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [openData, setOpenData] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  const handleCustomerClick = () => {
    setOpenCustomer(!openCustomer);
  };

  const handleDeviceClick = () => {
    setOpenDevice(!openDevice);
  };

  const handleDataClick = () => {
    setOpenData(!openData);
  };

  const handleAccountClick = () => {
    setOpenAccount(!openAccount);
  };

  return (
    <SidebarContainer>
      <Logo src="logo.png" alt="Precision Biosensor Logo" />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={handleCustomerClick}>
          <ListItemIcon>
            <DeviceHub />
          </ListItemIcon>
          <ListItemText primary="고객 검사기 관리" />
          {openCustomer ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCustomer} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem>
              <SubListItem button>
                <ListItemText primary="고객 검사기 목록" />
              </SubListItem>
            </StyledListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleDeviceClick}>
          <ListItemIcon>
            <DeviceHub />
          </ListItemIcon>
          <ListItemText primary="검사기 관리" />
          {openDevice ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openDevice} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem>
              <SubListItem button>
                <ListItemText primary="검사기 목록" />
              </SubListItem>
            </StyledListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleDataClick}>
          <ListItemIcon>
            <Storage />
          </ListItemIcon>
          <ListItemText primary="검사기 데이터 관리" />
          {openData ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openData} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem>
              <SubListItem button>
                <ListItemText primary="검사 결과" />
              </SubListItem>
            </StyledListItem>
            <StyledListItem>
              <SubListItem button>
                <ListItemText primary="정도 관리 결과" />
              </SubListItem>
            </StyledListItem>
            <StyledListItem>
              <SubListItem button>
                <ListItemText primary="정도 관리 물질" />
              </SubListItem>
            </StyledListItem>
            <StyledListItem>
              <SubListItem button>
                <ListItemText primary="자가 진단 결과" />
              </SubListItem>
            </StyledListItem>
            <StyledListItem>
              <SubListItem button>
                <ListItemText primary="오류" />
              </SubListItem>
            </StyledListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleAccountClick}>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="계정 관리" />
          {openAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyledListItem>
              <SubListItem button>
                <ListItemText primary="계정 목록" />
              </SubListItem>
            </StyledListItem>
          </List>
        </Collapse>

        <ListItem button>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="로그아웃" />
        </ListItem>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;