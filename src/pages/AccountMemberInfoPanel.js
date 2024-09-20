import React, { useState } from 'react';
import { Paper, Grid, Typography, Divider, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../components/CustomTextField';
import { useFormik } from 'formik';
import CustomDialog from '../components/CustomDialog'; // CustomDialog 경로
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // 아이콘

function DeleteButton() {
    const { t } = useTranslation('console');
    return (
        <Button
            sx={{
                width: '104px',
                height: '48px',
                padding: '9px 6px',
                backgroundColor: 'var(--white)',
                borderRadius: '10px',
                border: '2px solid var(--gray-400)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '4px',
                marginRight: '43px',
                transition: '0.3s',  // 애니메이션 부드럽게 적용
                
                '&:hover': {
                    borderColor: 'var(--primary-blue-500)', // hover 시 보더 색상 변경
                    backgroundColor: 'var(--white)', // 배경색 변경

                    '& .delete-icon': {
                        content: 'url(/icon-delete-hover.png)',  // hover 시 새로운 이미지로 변경
                    },

                    '& .delete-text': {
                        color: 'var(--primary-blue-500)',  // hover 시 텍스트 색상 변경
                    }
                }
            }}
        >
            <Typography
                className="delete-text"  // 클래스 추가
                sx={{
                    // width: '54px',
                    // height: '14px',
                    fontFamily: 'Pretendard',
                    fontSize: '14px',
                    fontWeight: 500,
                    textAlign: 'left',
                    color: 'var(--gray-400)',
                }}
            >
                {t('account-list.account_mod_dialog.delete')}
            </Typography>
            <Box
                component="img"
                src="icon-delete.png" // 아이콘 경로
                alt="delete icon"
                className="delete-icon"  // 클래스 추가
                sx={{
                    width: '30px',
                    height: '30px',
                    objectFit: 'contain',
                }}
            />
        </Button>
    );
}

const AccountMemberInfoPanel = () => {
    const { t } = useTranslation('console');
    const formik = useFormik({
        initialValues: {
            serial: '',
            qc_material: '',
            lot: ''
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    // Dialog의 open 상태를 관리하는 useState
    const [open, setOpen] = useState(false);

    // 다이얼로그 열기
    const handleOpen = () => {
        setOpen(true);
    };

    // 다이얼로그 닫기
    const handleClose = () => {
        setOpen(false);
    };

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
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <img src="/icon-guest.png" alt="system icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                            <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#303468' }}>
                                {t('account-list.account_mod_dialog.sub_title')}
                            </Typography>
                        </Box>
                        <DeleteButton />
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
                                }}>{t('account-list.account_mod_dialog.name')}</Typography>
                                <CustomTextField
                                    id="name"
                                    name="name"
                                    placeholder={t('account-list.account_mod_dialog.name')}
                                    // description="This will be device serial number"
                                    error={false}
                                    disabled={false}
                                    value={formik.values.name}
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
                                }}>{t('account-list.account_mod_dialog.department')}</Typography>
                                <CustomTextField
                                    id="department"
                                    name="department"
                                    placeholder={t('account-list.account_mod_dialog.department')}
                                    // description="This will be device serial number"
                                    error={false}
                                    disabled={false}
                                    value={formik.values.department}
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
                                }}>{t('account-list.account_mod_dialog.email')}</Typography>
                                <CustomTextField
                                    id="email"
                                    name="email"
                                    placeholder={t('account-list.account_mod_dialog.email')}
                                    // description="This will be device serial number"
                                    error={false}
                                    disabled={false}
                                    value={formik.values.email}
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
                                }}>{t('account-list.account_mod_dialog.grade')}</Typography>
                                <CustomTextField
                                    id="grade"
                                    name="grade"
                                    placeholder={t('account-list.account_mod_dialog.grade')}
                                    // description="This will be device serial number"
                                    error={false}
                                    disabled={false}
                                    value={formik.values.grade}
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
                        <Box sx={{ mt: '65px', display: 'flex', justifyContent: 'center', gap: '28px' }}>
                            <Button
                                // onClick={handleCloseFilterDialog}
                                variant="outlined"
                                sx={{ color: '#8b8fa8', border: 'solid 1px var(--gray-gray-200)', fontSize: '18px', fontWeight: '600px', width: '230px', height: '48px', borderRadius: '10px' }}
                            >
                                {t('button.cancel')}
                            </Button>
                            <div>
                                {/* 버튼을 클릭하면 다이얼로그가 열림 */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ backgroundColor: "#007dfa", fontSize: '18px', fontWeight: '600px', width: '230px', height: '48px', borderRadius: '10px' }}
                                    onClick={handleOpen}  // 다이얼로그 열기
                                >
                                    {t('button.modification')}
                                </Button>

                                {/* CustomDialog 컴포넌트 */}
                                <CustomDialog
                                    open={open}
                                    handleClose={handleClose}
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
                                            <img src={`${process.env.PUBLIC_URL}/alert-sign-line.png`} alt="alert" />
                                        </Box>
                                    }
                                    title="수정 완료"
                                    description="회원 정보 수정을 완료하였습니다."
                                />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AccountMemberInfoPanel;