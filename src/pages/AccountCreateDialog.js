import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CustomTextField from '../components/CustomTextField';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

export default function AccountCreateDialog({ open, handleClose }) {
    const { t } = useTranslation('console');

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
        onSubmit: (values) => {
            console.log(values);
            handleClose(); // 제출 후 다이얼로그 닫기
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
                style: { borderRadius: 10, padding: '20px', border: '1px solid #d9e2ec', width: '539px', height: '833px', boxSizing: 'border-box' },
            }}
            // maxWidth="sm"
            // fullWidth
        >
            <DialogTitle sx={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', color: '#303468' }}>
                {t('account-list.account_create_dialog.title')}
            </DialogTitle>

            <DialogContent>
                <Typography sx={{ color: '#6c757d', fontSize: '16px', mb: 2 }}>
                    {t('account-list.account_create_dialog.sub_title')}
                </Typography>

                {/* 계정 유형 선택 */}
                <ToggleButtonGroup
                    color="primary"
                    value={formik.values.accountType} // Formik에서 계정 유형 값 관리
                    exclusive
                    onChange={handleAccountTypeChange}
                    fullWidth
                    sx={{ mb: 2, justifyContent: 'center' }}
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
                            {t('account-list.account_create_dialog.admin_account')}
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
                            {t('account-list.account_create_dialog.user_account')}
                        </Box>
                    </ToggleButton>
                </ToggleButtonGroup>

                {/* 이메일 필드 */}
                <Box sx={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
                    <Typography sx={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--primary-blue-700)',
                        mb: '6px'
                    }}>{t('account-list.account_create_dialog.email')}</Typography>
                    <CustomTextField
                        id="email"
                        name="email"
                        placeholder={t('account-list.account_create_dialog.email_placeholder')}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                    />
                </Box>

                {/* 이름 필드 */}
                <Box sx={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 3 }}>
                    <Typography sx={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--primary-blue-700)',
                        mb: '6px'
                    }}>{t('account-list.account_create_dialog.name')}</Typography>
                    <CustomTextField
                        id="name"
                        name="name"
                        placeholder={t('account-list.account_create_dialog.name_placeholder')}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                    />
                </Box>

                {/* 소속 필드 */}
                <Box sx={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 3 }}>
                    <Typography sx={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--primary-blue-700)',
                        mb: '6px'
                    }}>{t('account-list.account_create_dialog.department')}</Typography>
                    <CustomTextField
                        id="department"
                        name="department"
                        placeholder={t('account-list.account_create_dialog.department_placeholder')}
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                    />
                </Box>

                {/* 비밀번호 필드 */}
                <Box sx={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 3 }}>
                    <Typography sx={{
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--primary-blue-700)',
                        mb: '6px'
                    }}>{t('account-list.account_create_dialog.pass')}</Typography>
                    <CustomTextField
                        id="pass"
                        name="pass"
                        type="password"
                        placeholder={t('account-list.account_create_dialog.pass_placeholder')}
                        value={formik.values.pass}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                    />
                </Box>

                {/* 비밀번호 확인 필드 */}
                <Box sx={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 3 }}>
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
                    }}>{t('account-list.account_create_dialog.pass_confirm')}</Typography>
                                        <CustomTextField
                        id="pass_confirm"
                        name="pass_confirm"
                        type="password"
                        placeholder={t('account-list.account_create_dialog.pass_confirm_placeholder')}
                        value={formik.values.pass_confirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="medium"
                        width="424px"
                        height="48px"
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center' }}> {/* 중앙 정렬 */}
                <Box display="flex" justifyContent="center" gap="24px" sx={{mb:'10px'}}> {/* 버튼 사이 간격 24px */}
                    <Button
                        onClick={formik.handleSubmit} // Formik의 handleSubmit로 폼 제출
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
                        sx={{
                            backgroundColor: '#007bff',
                            width: '200px',
                            height: '48px',
                            borderRadius: '10px',
                            fontSize: '18px',  // 폰트 크기 18px 설정
                        }}
                    >
                        {t('button.create')}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}