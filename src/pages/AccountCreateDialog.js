import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CustomTextField from '../components/CustomTextField';
import CustomDialog from '../components/CustomDialog';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import apiClient from '../api/apiClient'; // API client import
import Config from '../Config'; // apiUrl 추가
import { getAccessToken } from '../utils/token';

const apiUrl = Config.apiUrl;

export default function AccountCreateDialog({ open, handleClose, onSuccess }) {
    const { t } = useTranslation('console');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    // 성공적으로 계정이 생성되었을 때 호출할 함수
    const handleSuccess = () => {
        setSuccessDialogOpen(true);  // 성공 다이얼로그 열기
    };

    // 비밀번호 유효성 검증 함수 (특수문자에 (와 ) 추가)
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&()])[A-Za-z\d#@$!%*?&()]{8,20}$/;
        return passwordRegex.test(password);
    };

    // Formik 초기화 및 처리
    const formik = useFormik({
        initialValues: {
            accountType: 'admin',
            email: '',
            name: '',
            department: '',
            pass: '',
            pass_confirm: ''
        },
        validate: (values) => {
            const errors = {};

            // 이메일 유효성 검사
            if (!values.email) {
                errors.email = t('account_list.account_create_dialog.email_placeholder');
            } else if (!values.email.includes('@')) {
                errors.email = t('account_list.account_create_dialog.invalid_email');
            }
            // 이름 유효성 검사
            if (!values.name) {
                errors.name = t('account_list.account_create_dialog.name_placeholder'); // Name is required
            }

            // 소속 유효성 검사
            if (!values.department) {
                errors.department = t('account_list.account_create_dialog.department_placeholder'); // Department is required
            }

            // 비밀번호 유효성 검사
            if (!values.pass) {
                errors.pass = t('account_list.account_create_dialog.pass_placeholder');
            } else if (!isPasswordValid(values.pass)) {
                errors.pass = t('account_list.account_create_dialog.invalid_pass');
            }

            // 비밀번호 확인 유효성 검사
            if (values.pass !== values.pass_confirm) {
                errors.pass_confirm = t('account_list.account_create_dialog.invalid_pass_confirm');
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                // Construct request body
                const requestBody = {
                    email: values.email,
                    name: values.name,
                    password: values.pass,
                    role: values.accountType === 'admin' ? 'ADMIN' : 'MANAGER', // Assign role based on accountType
                    department: values.department,
                };

                // Send POST request to the API
                const response = await apiClient.post(`${apiUrl}/console/users`, requestBody, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`, // Assuming you have a function to get access token
                    },
                });

                // Handle success
                console.log('User created successfully:', response.data);
                handleSuccess(); // 계정 생성 성공시 다이얼로그 열기
            } catch (error) {
                console.error('Error creating user:', error);
            }
        },
    });

    // 계정 유형 변경 핸들러
    const handleAccountTypeChange = (event, newType) => {
        if (newType !== null) {
            formik.setFieldValue('accountType', newType);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: { borderRadius: 10, padding: '20px', border: '1px solid #d9e2ec', width: '539px', height: '870px', boxSizing: 'border-box' },
            }}
        // maxWidth="sm"
        // fullWidth
        >
            <DialogTitle sx={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', color: '#303468' }}>
                {t('account_list.account_create_dialog.title')}
            </DialogTitle>

            <DialogContent>
                <Typography sx={{ color: '#6c757d', fontSize: '16px', mb: 2 }}>
                    {t('account_list.account_create_dialog.sub_title')}
                </Typography>

                {/* 계정 유형 선택 */}
                <ToggleButtonGroup
                    color="primary"
                    value={formik.values.accountType} // Formik에서 계정 유형 값 관리
                    exclusive
                    onChange={handleAccountTypeChange}
                    fullWidth
                    sx={{ mb: 1, justifyContent: 'center' }}
                >
                    <ToggleButton value="admin"
                        sx={{
                            fontSize: '20px',
                            width: '203px',
                            height: '64px',
                            border: 'solid 2px var(--primary-blue-400)',
                            marginRight: '18px',
                            '&:hover': {
                                borderColor: '#007bff',
                            },
                            "&.MuiToggleButtonGroup-grouped": {
                                borderRadius: "10px !important",
                            }
                        }}>
                        <Box display="flex" alignItems="center">
                            <svg width="46" height="26" viewBox="0 0 46 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style={{ marginRight: '10px' }} >
                                <rect width="46" height="26" rx="13" fill="#CCF0EB" />
                                <circle cx="13" cy="13" r="4" fill="#00B69B" />
                                <path d="m28.57 7.102 3.336 8.148h.123l3.336-8.148h1.477V17H35.68V9.521h-.096L32.508 17h-1.094l-3.076-7.479h-.082V17h-1.162V7.102h1.476z" fill="#00B69B" />
                            </svg>
                            {t('account_list.account_create_dialog.admin_account')}
                        </Box>
                    </ToggleButton>

                    <ToggleButton value="user" sx={{
                        fontSize: '20px',
                        width: '203px',
                        height: '64px',
                        border: 'solid 2px var(--primary-blue-400)',
                        borderLeft: 'solid 2px var(--primary-blue-400) !important',
                        '&:hover': {
                            border: 'solid 2px #007bff !important'
                        },
                        "&.MuiToggleButtonGroup-grouped": {
                            borderRadius: "10px !important",
                        }
                    }}>
                        <Box display="flex" alignItems="center">
                            <svg width="46" height="26" viewBox="0 0 46 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                                style={{ marginRight: '10px' }} >
                                <rect width="46" height="26" rx="13" fill="#E9E7FD" />
                                <circle cx="13" cy="13" r="4" fill="#7836CB" />
                                <path d="M27.54 18h-1.288l3.612-9.912h1.288L34.792 18h-1.288l-.98-2.772H28.52L27.54 18zm1.372-3.864h3.22l-1.568-4.452h-.084l-1.568 4.452z" fill="#7836CB" />
                            </svg>
                            {t('account_list.account_create_dialog.user_account')}
                        </Box>
                    </ToggleButton>
                </ToggleButtonGroup>

                {/* 이메일 필드 */}
                <Box
                    sx={{
                        paddingLeft: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        mt: formik.errors.email ? 0 : 2, // Reduce margin-top if error exists
                    }}
                >
                    <Typography sx={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--primary-blue-700)',
                        mb: '6px'
                    }}>{t('account_list.account_create_dialog.email')}</Typography>
                    <CustomTextField
                        id="email"
                        name="email"
                        placeholder={t('account_list.account_create_dialog.email_placeholder')}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                        error={formik.touched.email && !!formik.errors.email}
                        description={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                    // error={!formik.values.email.includes('@')} // Email validation
                    // description={!formik.values.email.includes('@') ? t('account_list.account_create_dialog.invalid_email') : ''}
                    />
                </Box>

                {/* 이름 필드 */}
                <Box
                    sx={{
                        paddingLeft: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        mt: formik.errors.name ? 0 : 2, // Adjust margin-top based on error
                    }}
                >
                    <Typography sx={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--primary-blue-700)',
                        mb: '6px'
                    }}>{t('account_list.account_create_dialog.name')}</Typography>
                    <CustomTextField
                        id="name"
                        name="name"
                        placeholder={t('account_list.account_create_dialog.name_placeholder')}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                        error={formik.touched.name && !!formik.errors.name}
                        description={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                    // error={formik.values.name === ''} // Name validation
                    // description={formik.values.name === '' ? t('account_list.account_create_dialog.name_placeholder') : ''}
                    />
                </Box>

                {/* 소속 필드 */}
                <Box
                    sx={{
                        paddingLeft: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        mt: formik.errors.department ? 0 : 2, // Adjust margin-top based on error
                    }}
                >
                    <Typography sx={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--primary-blue-700)',
                        mb: '6px'
                    }}>{t('account_list.account_create_dialog.department')}</Typography>
                    <CustomTextField
                        id="department"
                        name="department"
                        placeholder={t('account_list.account_create_dialog.department_placeholder')}
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                        error={formik.touched.department && !!formik.errors.department}
                        description={formik.touched.department && formik.errors.department ? formik.errors.department : ''}
                    // error={formik.values.department === ''} // Department validation
                    // description={formik.values.department === '' ? t('account_list.account_create_dialog.department_placeholder') : ''}
                    />
                </Box>

                {/* 비밀번호 필드 */}
                <Box
                    sx={{
                        paddingLeft: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        mt: formik.errors.pass ? 2 : 3,  // 에러가 있으면 상단 마진을 줄임
                        mb: formik.errors.pass ? 1 : 3,  // 에러가 있으면 하단 마진을 줄임
                    }}
                >
                    <Typography sx={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--primary-blue-700)',
                        mb: '6px'
                    }}>{t('account_list.account_create_dialog.pass')}</Typography>
                    <CustomTextField
                        id="pass"
                        name="pass"
                        type="password"
                        placeholder={t('account_list.account_create_dialog.pass_placeholder')}
                        value={formik.values.pass}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                        error={formik.values.pass && !isPasswordValid(formik.values.pass)} // error 설정
                        description={
                            formik.values.pass && !isPasswordValid(formik.values.pass)
                                ? t('account_list.account_create_dialog.invalid_pass')
                                : ''
                        }
                    />
                </Box>

                {/* 비밀번호 확인 필드 */}
                <Box
                    sx={{
                        paddingLeft: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        mt: formik.errors.pass_confirm ? 2 : 3,  // 에러가 있으면 상단 마진을 줄임
                        // mb: formik.errors.pass_confirm ? 0 : 3,  // 에러가 있으면 하단 마진을 줄임
                    }}
                >
                    <Typography sx={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 600,
                        fontStretch: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        letterSpacing: 'normal',
                        textAlign: 'left',
                        color: 'var(--primary-blue-700)',
                        mb: '6px'
                    }}>{t('account_list.account_create_dialog.pass_confirm')}</Typography>
                    <CustomTextField
                        id="pass_confirm"
                        name="pass_confirm"
                        type="password"
                        placeholder={t('account_list.account_create_dialog.pass_confirm_placeholder')}
                        value={formik.values.pass_confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                        error={formik.values.pass !== formik.values.pass_confirm} // Password confirmation validation
                        description={formik.values.pass !== formik.values.pass_confirm ? t('account_list.account_create_dialog.invalid_pass_confirm') : ''}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center' }}> {/* 중앙 정렬 */}
                <Box display="flex" justifyContent="center" gap="24px" sx={{ mb: '10px' }}> {/* 버튼 사이 간격 24px */}
                    <Button
                        onClick={handleClose} // Formik의 handleSubmit로 폼 제출
                        variant="outlined"
                        sx={{
                            width: '200px',
                            height: '48px',
                            borderRadius: '10px',
                            fontSize: '18px',  // 폰트 크기 18px 설정
                        }}
                    >
                        {t('button.cancel')}
                    </Button>
                    <Button
                        onClick={formik.handleSubmit} // Formik의 handleSubmit로 폼 제출
                        variant="contained"
                        disabled={
                            formik.values.pass !== formik.values.pass_confirm || // Passwords must match
                            formik.values.pass.length < 8 || // Password must be at least 8 characters
                            !formik.values.email.includes('@') || // Email must include '@'
                            formik.values.name === '' || // Name is empty
                            formik.values.department === '' || // Department is empty
                            formik.errors.email || formik.errors.pass || formik.errors.pass_confirm // Check if there are validation errors
                        }
                        sx={{
                            // backgroundColor: '#007bff',
                            backgroundColor:
                                formik.values.pass !== formik.values.pass_confirm ||
                                    formik.values.pass.length < 8 ||
                                    !formik.values.email.includes('@') ||
                                    formik.values.name === '' ||
                                    formik.values.department === '' ||
                                    formik.errors.email || formik.errors.pass || formik.errors.pass_confirm
                                    ? '#c0c0c0' // Gray when disabled
                                    : '#007bff', // Blue when enabled
                            width: '200px',
                            height: '48px',
                            borderRadius: '10px',
                            fontSize: '18px',  // 폰트 크기 18px 설정
                        }}
                    >
                        {t('button.create')}
                    </Button>
                    {/* CustomDialog 컴포넌트 : 등록완료 */}
                    <CustomDialog
                        open={successDialogOpen}
                        handleClose={() => {
                            setSuccessDialogOpen(false); // 등록완료 다이얼로그 닫기
                            handleClose(); // 회원등록 다이얼로그 닫기
                            // 부모 컴포넌트의 리스트 갱신 로직 호출 필요
                            if (typeof onSuccess === 'function') {
                                onSuccess(); // 부모의 리스트 갱신을 위한 콜백 호출
                            }
                        }}
                        icon={
                            <Box
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '10px',
                                    backgroundColor: '#EBEEF8', // 박스 배경색
                                }}
                            >
                                {/* <WarningIcon sx={{ fontSize: 24, color: '#6698FF' }} /> */}
                                <img src={`${process.env.PUBLIC_URL}/icon-diag-complete.png`} alt="alert" />
                            </Box>
                        }
                        title={t('account_list.account_create_dialog.create_done')}
                        description={t('account_list.account_create_dialog.create_done_description')}
                    />
                </Box>
            </DialogActions>
        </Dialog>
    );
}