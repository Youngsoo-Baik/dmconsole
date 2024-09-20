import React, { useState } from 'react';
import { Box, Typography, Avatar, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MenuItem, FormControl, Select, InputBase, FormHelperText, ListItemText, ListItemIcon } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

const CustomArrowDownIcon = (props) => {
  console.log('CustomArrowDownIcon');
  return (
    <img
      src={`${process.env.PUBLIC_URL}/down.png`}
      alt="Custom Arrow Down"
      {...props}
    // style={{ width: '1em', height: '1em' }} // 원하는 스타일 적용
    />
  );
};

const CustomArrowUpIcon = (props) => {
  console.log('CustomArrowUpIcon');
  return (
    <img
      src={`${process.env.PUBLIC_URL}/up.png`}
      alt="Custom Arrow Up"
      {...props}
    // style={{ width: '1em', height: '1em' }} // 원하는 스타일 적용
    />
  );
};

const CustomInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    width: '260px',
    height: '38px',
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #80befc',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    padding: '0px 5px',
    // padding: '0px -50px 1px 5px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  width: '252px',
  height: '38px',
  padding: '4px 12px',
  marginLeft: '4px',
  marginTop: '4px',
  marginBottom: '4px',
  '&.Mui-selected': {
    borderRadius: 10, // 선택된 아이템의 모서리를 둥글게 만듦
    border: '2px solid #80BEFC', // 선택된 아이템의 테두리 스타일
    backgroundColor: '#ebeef8', // 선택된 아이템의 배경색
    padding: '2px 10px', // 테두리 두께만큼 padding 조정
    // margin: '-2px 0 0 0', // 선택된 상태에서 margin을 조정하여 크기 유지
    '&:hover': {
      border: 'none', // 선택된 아이템이 hover되었을 때 테두리 제거
      padding: '4px 12px', // hover 시 padding 원래대로 복구
      borderRadius: 10, // 선택된 아이템의 모서리를 둥글게 만듦
      backgroundColor: '#cedff4', // 선택된 아이템이 hover되었을 때 배경색
    },
  },
  '&:hover': {
    borderRadius: 10, // 선택된 아이템의 모서리를 둥글게 만듦
    backgroundColor: '#EBEEF8', // 일반 아이템의 hover 시 배경색
  },
}));

const CustomCheckedIcon = (props) => (
  <img
    src={`${process.env.PUBLIC_URL}/check.png`} // 여기에 커스텀 이미지 경로를 설정
    alt="Selected Icon"
    {...props}
    style={{ width: '30px', height: '30px' }} // 아이콘 크기 조정
  />
);

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      language: 'ko',
    },
    onSubmit: (values) => {
      console.log('Selected language:', values.language);
    },
  });
  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    formik.setFieldValue('language', event.target.value);
    formik.submitForm();

    // Change the language in i18n
    i18n.changeLanguage(selectedLanguage);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl variant="outlined" fullWidth >
        <Select
          name="language"
          value={formik.values.language}
          onChange={handleChange}
          input={<CustomInput />}
          sx={{
            width: '260px',
            height: '38px',
            borderRadius: 10,
            '& .MuiSelect-icon': {
              top: 'calc(50% - 0.8em)',
              color: '#000', // 아이콘 색상 설정
              position: 'absolute',  // 절대 위치 지정
              pointerEvents: 'none',  // 아이콘에 대한 클릭 이벤트 비활성화
            },
            '& .MuiSelect-select': {
              paddingRight: '10px', // 텍스트와 아이콘 사이의 간격 확보
            },
            '& .MuiListItemIcon-root': {
              display: 'none', // Select 박스 부분에서 ListItemIcon을 숨김
            },
          }}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          IconComponent={'& .MuiSelect-icon' ? CustomArrowDownIcon : CustomArrowUpIcon}
        >
          <CustomMenuItem value="en">
            <ListItemText primary="English" />
            {open && formik.values.language === 'en' && (
              <ListItemIcon>
                <CustomCheckedIcon />
              </ListItemIcon>
            )}
          </CustomMenuItem>
          <CustomMenuItem value="ko">
            <ListItemText primary="한국어" />
            {open && formik.values.language === 'ko' && (
              <ListItemIcon>
                <CustomCheckedIcon />
              </ListItemIcon>
            )}
          </CustomMenuItem>ß
        </Select>
        {formik.errors.language && (
          <FormHelperText error>{formik.errors.language}</FormHelperText>
        )}
      </FormControl>
    </form>
  );
};

const Header = () => {
  const { t } = useTranslation('console');

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '113px', width: '1592px', padding: '0px 10px', borderBottom: '1px solid #ccc' }}>
      <Typography variant="h6" color="#dddddd" sx={{ marginLeft: '29px', fontSize: '26px', fontWeight: '600' }}>
        {t('main.header.title')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar sx={{ bgcolor: 'primary.main', marginRight: '8px' }} /> */}
        <img src="profile.png" alt="profile" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: '8px' }} />
        <Typography variant="body1">Kildong@precision-bio.com</Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Box display="flex" alignItems="center" ml={2} mr='89px'>
          {/* 아이콘을 LanguageDropdown 앞에 추가 */}
          <img
            src="/iconoir_language.png"  // 아이콘 경로
            alt="Language Icon"
            style={{
              marginRight: '10px', // 아이콘과 텍스트 간격
            }}
          />
          {/* <LanguageToggle /> */}
          <LanguageDropdown />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;