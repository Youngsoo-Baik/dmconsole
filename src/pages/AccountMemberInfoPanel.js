import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Divider, Box, Button, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomEditTextField from '../components/CustomEditTextField';
import { useFormik } from 'formik';
import CustomDialog from '../components/CustomDialog'; // CustomDialog 경로
import CustomLongDescriptionDialog from '../components/CustomLongDescriptionDialog'; // CustomLongDescriptionDialog 경로
import CustomImgSelect from '../components/CustomImgSelect';
import apiClient from '../api/apiClient'; // API client import
import Config from '../Config'; // apiUrl 추가
import { getAccessToken } from '../utils/token';

const apiUrl = Config.apiUrl;

function DeleteButton({ userId, onDeleteSuccess, handleClose }) {
    const { t } = useTranslation('console');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteConfirm = async () => {
        if (window.confirm(t('account_list.account_mod_dialog.confirm_delete'))) {
            try {
                await apiClient.delete(`${apiUrl}/console/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });
                onDeleteSuccess(); // 성공 시 콜백 호출
                setDeleteDialogOpen(false); // 다이얼로그 닫기
                handleClose(); // 회원정보수정 다이얼로그 닫기
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <>
            <Button
                onClick={() => setDeleteDialogOpen(true)} // 다이얼로그 열기
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
                    {t('account_list.account_mod_dialog.delete')}
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
            {/* CustomLongDescriptionDialog 컴포넌트 : 삭제하기 */}
            <CustomLongDescriptionDialog
                open={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
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
                        <img src={`${process.env.PUBLIC_URL}/icon-diag-delete.png`} alt="alert" />
                    </Box>
                }
                title={t('account_list.account_delete_dialog.title')}
                description={t('account_list.account_delete_dialog.description') + '\n' + t('account_list.account_delete_dialog.description_next')}
                showCancelButton={true}
                onConfirm={handleDeleteConfirm}
                conCancel={() => setDeleteDialogOpen(false)}
            />
        </>
    );
}

const AccountMemberInfoPanel = ({ open, handleClose, selectedRow, onDeleteSuccess }) => {
    const { t } = useTranslation('console');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteDoneDialogOpen, setDeleteDoneDialogOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            department: '',
            email: '',
            grade: ''
        },
        onSubmit: async (values) => {
            try {
                const requestBody = {
                    name: values.name,
                    department: values.department,
                    role: values.grade === 'A' ? 'ADMIN' : 'MANAGER', // role을 grade에 따라 설정
                };

                await apiClient.patch(`${apiUrl}/console/users/${selectedRow.id}`, requestBody, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                // 수정 완료 다이얼로그 표시
                setSuccessDialogOpen(true);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    });

    // 계정 삭제 성공 시 처리 함수
    const handleDeleteSuccess = () => {
        setDeleteDoneDialogOpen(true); // 삭제 후 성공 메시지 다이얼로그를 열거나 다른 처리 가능
        handleClose(); // 회원정보수정 다이얼로그 닫기
        onDeleteSuccess(); // 회원목록 갱신
    };

    // selectedRow가 변경되거나 컴포넌트가 마운트될 때 API 호출
    useEffect(() => {
        if (selectedRow) {
            apiClient.get(`${apiUrl}/console/users/${selectedRow.id}`, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            }).then(response => {
                const { name, email, department, role } = response.data;
                formik.setValues({
                    name,
                    email,
                    department,
                    grade: role === 'ADMIN' ? 'A' : 'M', // role에 따라 grade 설정
                });
            }).catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, [selectedRow]);

    //menuItems for grade
    const gradeMenuItems = [
        { value: 'A', icon: './icon-user.svg' },
        { value: 'M', icon: './icon-admin.svg' }
    ];
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
                                {t('account_list.account_mod_dialog.sub_title')}
                            </Typography>
                        </Box>
                        {/* DeleteButton 호출 부분 */}
                        <DeleteButton
                            userId={selectedRow.id}
                            onDeleteSuccess={handleDeleteSuccess}
                            handleClose={handleClose}
                        />
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
                                }}>{t('account_list.account_mod_dialog.name')}</Typography>
                                <CustomEditTextField
                                    id="name"
                                    name="name"
                                    placeholder={t('account_list.account_mod_dialog.name')}
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
                                }}>{t('account_list.account_mod_dialog.department')}</Typography>
                                <CustomEditTextField
                                    id="department"
                                    name="department"
                                    placeholder={t('account_list.account_mod_dialog.department')}
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
                                }}>{t('account_list.account_mod_dialog.email')}</Typography>
                                <CustomEditTextField
                                    id="email"
                                    name="email"
                                    placeholder={t('account_list.account_mod_dialog.email')}
                                    // description="This will be device serial number"
                                    error={false}
                                    disabled={false}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // error={formik.touched.myTextField && Boolean(formik.errors.myTextField)}
                                    // helperText={formik.touched.myTextField && formik.errors.myTextField}
                                    active={true}
                                    readOnly={true} // 이메일 필드를 읽기 전용으로 설정
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
                                }}>{t('account_list.account_mod_dialog.grade')}</Typography>
                                {/* <CustomEditTextField
                                    id="grade"
                                    name="grade"
                                    placeholder={t('account_list.account_mod_dialog.grade')}
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
                                /> */}
                                <CustomImgSelect
                                    id="grade"
                                    name="grade"
                                    value={formik.values.grade}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    menuItems={gradeMenuItems}
                                    // placeholder={t('self_diag.filter_search.select')}
                                    // description="Select a language"
                                    width="322px"   // Custom width
                                    height="48px"   // Custom height
                                    // fontSize="18px" // Custom font size
                                    itemWidth="303px"  // Custom Menu Item width
                                    itemHeight="42px"  // Custom Menu Item height
                                />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Third Row */}
                    <Grid item xs={12}>
                        <Box sx={{ mt: '65px', display: 'flex', justifyContent: 'center', gap: '28px' }}>
                            <Button
                                onClick={handleClose}
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
                                    onClick={formik.handleSubmit}  // API 호출
                                >
                                    {t('button.modification')}
                                </Button>

                                {/* CustomDialog 컴포넌트 : 수정완료 */}
                                <CustomDialog
                                    open={successDialogOpen}
                                    handleClose={() => setSuccessDialogOpen(false)}
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
                                    title={t('account_list.account_mod_dialog.complete')}
                                    description={t('account_list.account_mod_dialog.complete_description')}
                                />

                                {/* CustomDialog 컴포넌트 : 삭제완료 */}
                                <CustomDialog
                                    open={deleteDoneDialogOpen}
                                    handleClose={() => setDeleteDoneDialogOpen(false)}
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
                                            <img src={`${process.env.PUBLIC_URL}/icon-diag-delete.png`} alt="alert" />
                                        </Box>
                                    }
                                    title={t('account_list.account_delete_dialog.delete_done.title')}
                                    description={t('account_list.account_delete_dialog.delete_done.description')}
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