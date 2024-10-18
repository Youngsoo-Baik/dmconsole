import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Divider, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../components/CustomTextField';
import { useFormik } from 'formik';
import CustomDialog from '../components/CustomDialog';
import apiClient from '../api/apiClient'; // API client import
import Config from '../Config'; // apiUrl 추가
import { getAccessToken } from '../utils/token';

const apiUrl = Config.apiUrl;

const AccountPasswordInfoPanel = ({ open, handleClose, selectedRow }) => {
    const { t } = useTranslation('console');
    const [changeDialogOpen, setChangeDialogOpen] = useState(false);
    const [changeDoneDialogOpen, setChangeDoneDialogOpen] = useState(false);

    // '확인' 버튼 클릭 시 비밀번호 변경 요청하는 함수
    const handleChangeConfirm = async () => {
        try {
            const response = await apiClient.patch(
                `${apiUrl}/console/users/${selectedRow.id}/reset-password`,
                {
                    newPassword: formik.values.new_pass,
                    passwordConfirm: formik.values.confirm_pass
                },
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                }
            );

            if (response.status === 200 && response.data.result === true) {
                setChangeDialogOpen(false);
                setChangeDoneDialogOpen(true);  // 성공 시 변경 완료 다이얼로그 열기
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    // 비밀번호 유효성 검증 함수 (특수문자에 (와 ) 추가)
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&()])[A-Za-z\d#@$!%*?&()]{8,20}$/;
        return passwordRegex.test(password);
    };

    const formik = useFormik({
        initialValues: {
            new_pass: '',
            confirm_pass: ''
        },
        validate: (values) => {
            const errors = {};

            // 비밀번호 유효성 검사
            if (!values.new_pass) {
                errors.new_pass = t('account_list.pass_mod_dialog.new_pass_placeholder');
            } else if (!isPasswordValid(values.new_pass)) {
                errors.new_pass = t('account_list.account_create_dialog.invalid_pass');
            }

            // 비밀번호 확인 유효성 검사
            if (values.pass !== values.confirm_pass) {
                errors.confirm_pass = t('account_list.account_create_dialog.invalid_pass_confirm');
            }

            return errors;
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Paper
            sx={{
                width: '900px',
                height: '223px',
                // padding: '18px',
                borderRadius: '10px',
                boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Grid container spacing={2} sx={{ paddingLeft: '14px' }}>
                {/* Title Section */}
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <img src="/icon-lock.png" alt="system icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                        <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#303468' }}>
                            {t('account_list.pass_mod_dialog.sub_title')}
                        </Typography>
                    </Box>
                </Grid>

                {/* Divider after the title */}
                <Grid item xs={12}>
                    <Divider sx={{ width: '864px', height: '1.5px', backgroundColor: '#cbcbcb' }} />
                </Grid>

                {/* Password Information Rows */}
                <Grid container item xs={12} spacing={1} sx={{ mt: 2, maxHeight: '95px' }}>

                    {/* Second Row */}
                    {/* <Grid item xs={12}> */}
                    {/* <Box sx={{ display: 'flex', gap: '158px', mt: 2 }}> */}
                    <Grid item xs={6}>
                        <Box sx={{ paddingLeft: '37px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                                mb: '8px'
                            }}>{t('account_list.pass_mod_dialog.new_pass')}</Typography>
                            <CustomTextField
                                id="new_pass"
                                name="new_pass"
                                type="password"
                                placeholder={t('account_list.pass_mod_dialog.new_pass_placeholder')}
                                // description="This will be device serial number"
                                disabled={false}
                                value={formik.values.new_pass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // error={formik.touched.myTextField && Boolean(formik.errors.myTextField)}
                                // helperText={formik.touched.myTextField && formik.errors.myTextField}
                                active={true}
                                size="medium"
                                width="322px"   // 가로 크기 지정
                                height="48px"   // 세로 크기 지정
                                error={formik.values.new_pass && !isPasswordValid(formik.values.new_pass)} // error 설정
                                description={
                                    formik.values.new_pass && !isPasswordValid(formik.values.new_pass)
                                        ? t('account_list.account_create_dialog.invalid_pass')
                                        : ''
                                }
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                                mb: '8px'
                            }}>{t('account_list.pass_mod_dialog.confirm_pass')}</Typography>
                            <CustomTextField
                                id="confirm_pass"
                                name="confirm_pass"
                                type="password"
                                placeholder={t('account_list.pass_mod_dialog.confirm_pass_placeholder')}
                                // description="This will be device serial number"
                                disabled={false}
                                value={formik.values.confirm_pass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // error={formik.touched.myTextField && Boolean(formik.errors.myTextField)}
                                // helperText={formik.touched.myTextField && formik.errors.myTextField}
                                active={true}
                                size="medium"
                                width="322px"   // 가로 크기 지정
                                height="48px"   // 세로 크기 지정
                                error={formik.values.new_pass !== formik.values.confirm_pass} // Password confirmation validation
                                description={formik.values.new_pass !== formik.values.confirm_pass ? t('account_list.account_create_dialog.invalid_pass_confirm') : ''}
                            />
                        </Box>
                    </Grid>
                    {/* </Box> */}
                </Grid>
            </Grid>

            <Grid container item xs={12} spacing={1} sx={{ mt: '170px', mb: '20px' }}>
                {/* Third Row : cancel and change button */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '28px' }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{ color: '#8b8fa8', border: 'solid 1px var(--gray-gray-200)', fontSize: '18px', fontWeight: '600px', width: '230px', height: '48px', borderRadius: '10px' }}
                        >
                            {t('button.cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: "#007dfa", fontSize: '18px', fontWeight: '600px', width: '230px', height: '48px', borderRadius: '10px' }}
                            onClick={() => setChangeDialogOpen(true)}  // 변경 버튼 클릭 시 다이얼로그 열기
                        >
                            {t('button.change')}
                        </Button>
                        {/* CustomDialog 컴포넌트 : 비밀번호변경? */}
                        <CustomDialog
                            open={changeDialogOpen}
                            handleClose={() => setChangeDialogOpen(false)}
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
                                    <img src={`${process.env.PUBLIC_URL}/icon-diag-pass.png`} alt="alert" />
                                </Box>
                            }
                            title={t('account_list.pass_mod_confirm_dialog.title')}
                            // description={t('account_list.account_delete_dialog.description') + '\n' + t('account_list.account_delete_dialog.description_next')}
                            showCancelButton={true}
                            onConfirm={handleChangeConfirm}
                            conCancel={() => setChangeDialogOpen(false)}
                        />
                        {/* CustomDialog 컴포넌트 : 변경완료 */}
                        <CustomDialog
                            open={changeDoneDialogOpen}
                            handleClose={() => setChangeDoneDialogOpen(false)}
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
                                    <img src={`${process.env.PUBLIC_URL}/icon-diag-pass.png`} alt="alert" />
                                </Box>
                            }
                            title={t('account_list.pass_mod_done_dialog.title')}
                            description={t('account_list.pass_mod_done_dialog.description')}
                        />
                    </Box>
                </Grid>
            </Grid>
            {/* </Grid> */}
        </Paper>
    );
};

export default AccountPasswordInfoPanel;