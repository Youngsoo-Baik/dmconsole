import React, { useState } from 'react';
import { Box, TextField, Button, Typography, InputAdornment, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../api/auth'; // auth.js에서 login, logout 함수 가져오기
// const backgroundImage = `${process.env.PUBLIC_URL}/login_image_01.png`;
const backgroundImage = 'login_image_01.png';

const Container = styled(Box)({
  width: '1920px',
  height: '1080px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // background: `linear-gradient(to right, #4e6fe3 8%, #2b3d7d 92%), url(${backgroundImage})`,
  background: `url(${backgroundImage}), linear-gradient(to right, #4e6fe3 8%, #2b3d7d 92%)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const LoginBox = styled(Box)({
  width: '710px',
  height: '700px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0px',
});

const Logo = styled('img')({
  width: '250px',
  height: '89.4px',
  marginBottom: '40px',
  marginTop: '58px'
});

const StyledButton = styled(Button)({
  width: '480px',
  height: '70px',
  borderRadius: '8px',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '22px',
  fontWeight: '600',
  '&:hover': {
    backgroundColor: '#0069d9',
  },
});
const DMSTextContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '30px',
});

const Line = styled(Box)({
  width: '137px',
  height: '0.5px',
  backgroundColor: '#7d7d7d',
});

const DMSText = styled(Typography)({
  width: '177px',
  height: '33px',
  flexGrow: 0,
  fontFamily: 'Pretendard',
  fontSize: '28px',
  fontWeight: '700',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  textAlign: 'left',
  color: '#007dfa',
  marginLeft: '15px',
  marginRight: '14px'
});

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize the navigate function
  const { t } = useTranslation('console');

  const handleLogin = async () => {

    /* old implementation
    const url = `${apiUrl}/console/login`;
    // const url = "/console/login";
    //const content = { email: "admin@precision-bio.com", password: "admin" };
    // const content = { email: `${username}`, password: `${password}` };
    const content = { email: `${email}`, password: `${password}` };
    const config = { 'Content-Type': 'application/json' };
    console.log(content);
    let res = "";

    axios.post(url, content, config).then(function (response) {
      console.log("Got Response")

      res = response;
      console.log(res);
      console.log(res.status);
      if (res.status === 201) {
        console.log("Login Success");
        onLogin();  // 로그인 상태 변경
        navigate('/customer-devices');  // Navigate to the home page on successful login
      } else {
        // console.log("status is not 201");
        // console.log(res.status);
        alert('Invalid login credentials');
      }
    }).catch(function (error) {
      console.log(error);
    });
    */
    try {
      await login(email, password); // auth.js의 login 함수 호출
      console.log("Login Success");
      onLogin();  // 로그인 상태 변경
      navigate('/customer-devices');  // Navigate to the home page on successful login
    } catch (error) {
      console.error('로그인 실패:', error.response?.data || error.message);
    }

  };

  return (
    <Container>
      <LoginBox>
        <Logo src="logo.png" alt="Precision Biosensor Logo" />
        <DMSTextContainer>
          <Line />
          <DMSText>{t('login.header.title')}</DMSText>
          <Line />
        </DMSTextContainer>
        <FormControl variant="outlined" sx={{ marginTop: '55px', width: '480px', height: '73px' }}>
          <TextField
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={email ? `${t('login.email.label')}` : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
              sx: { paddingLeft: '25px', height: '73px' },
            }}
            variant="outlined"
            placeholder={t('login.email.placeholder')}
            fullWidth
            sx={{ '& fieldset': { borderRadius: '8px' } }}
          />
        </FormControl>
        <FormControl variant="outlined" sx={{ marginTop: '44px', marginBottom: "66.6px", width: '480px', height: '73px' }}>
          <TextField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={password ? `${t('login.password.label')}` : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              sx: { paddingLeft: '25px', height: '73px' },
            }}
            variant="outlined"
            placeholder={t('login.password.placeholder')}
            fullWidth
            sx={{ '& fieldset': { borderRadius: '8px' } }}
          />
        </FormControl>
        <StyledButton onClick={handleLogin}>{t('button.login')}</StyledButton>
      </LoginBox>
    </Container>
  );
};

export default Login;