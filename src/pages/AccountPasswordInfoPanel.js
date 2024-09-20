import React from 'react';
import { Paper, Grid, Typography, Divider, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../components/CustomTextField';
import { useFormik } from 'formik';


const AccountPasswordInfoPanel = () => {
    const { t } = useTranslation('console');
    const formik = useFormik({
        initialValues: {
            old_pass: '',
            new_pass: '',
            confirm_pass: ''
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Paper
            sx={{
                width: '900px',
                height: '322px',
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
                            {t('account-list.pass_mod_dialog.sub_title')}
                        </Typography>
                    </Box>
                </Grid>

                {/* Divider after the title */}
                <Grid item xs={12}>
                    <Divider sx={{ width: '864px', height: '1.5px', backgroundColor: '#cbcbcb' }} />
                </Grid>

                {/* System Information Rows */}
                <Grid container item xs={12} spacing={1} sx={{}}>
                    {/* First Row */}
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', gap: '158px', mt: 1 }}>
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
                                }}>{t('account-list.pass_mod_dialog.old_pass')}</Typography>
                                <CustomTextField
                                    id="old_pass"
                                    name="old_pass"
                                    placeholder={t('account-list.pass_mod_dialog.old_pass_placeholder')}
                                    // description="This will be device serial number"
                                    error={false}
                                    disabled={false}
                                    value={formik.values.old_pass}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // error={formik.touched.myTextField && Boolean(formik.errors.myTextField)}
                                    // helperText={formik.touched.myTextField && formik.errors.myTextField}
                                    active={true}
                                    size="medium"
                                    width="322px"   // 가로 크기 지정
                                    height="48px"   // 세로 크기 지정
                                />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Second Row */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: '158px', mt: 2 }}>
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
                                }}>{t('account-list.pass_mod_dialog.new_pass')}</Typography>
                                <CustomTextField
                                    id="new_pass"
                                    name="new_pass"
                                    placeholder={t('account-list.pass_mod_dialog.new_pass_placeholder')}
                                    // description="This will be device serial number"
                                    error={false}
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
                                />
                            </Box>
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
                                }}>{t('account-list.pass_mod_dialog.confirm_pass')}</Typography>
                                <CustomTextField
                                    id="confirm_pass"
                                    name="confirm_pass"
                                    placeholder={t('account-list.pass_mod_dialog.confirm_pass_placeholder')}
                                    // description="This will be device serial number"
                                    error={false}
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
                                />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Third Row */}
                    <Grid item xs={12}>
                        <Box sx={{ mt: '80px', display: 'flex', justifyContent: 'center', gap: '28px' }}>
                            <Button
                                // onClick={handleCloseFilterDialog}
                                variant="outlined"
                                sx={{ color: '#8b8fa8', border: 'solid 1px var(--gray-gray-200)', fontSize: '18px', fontWeight: '600px', width: '230px', height: '48px', borderRadius: '10px' }}
                            >
                                {t('button.cancel')}
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: "#007dfa", fontSize: '18px', fontWeight: '600px', width: '230px', height: '48px', borderRadius: '10px' }}
                            >
                                {t('button.modification')}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AccountPasswordInfoPanel;