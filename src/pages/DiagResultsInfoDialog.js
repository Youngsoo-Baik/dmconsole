import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Grid, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import { styled } from '@mui/system';
import '../styles/colors.css';
import apiClient from '../api/apiClient'; // API client import
// import Config from '../Config'; // apiUrl 추가
// import { getAccessToken } from '../utils/token';
// const apiUrl = Config.apiUrl;

// const CustomDivider = styled(Divider)(({ theme }) => ({
//     width: '0.5px',
//     height: '54px',
//     margin: '12.6px 35px 12.6px 22.5px',
//     // transform: 'rotate(-270deg)',
//     backgroundColor: 'var(--gray-400)', // Corresponds to var(--gray-400)
// }));

export default function DiagResultsInfoDialog({ open, onClose, rowId }) {
    const { t } = useTranslation('console');
    const [diagData, setDiagData] = useState(null); // 상태(state)로 응답 데이터를 관리
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        if (rowId && open) {
            // API 호출
            const fetchData = async () => {
                try {
                    const response = await apiClient.get(`/console/self-tests/${rowId}`);
                    setDiagData(response.data); // 응답 데이터를 상태에 저장
                    setLoading(false); // 로딩 완료
                } catch (error) {
                    console.error('API 호출 실패:', error);
                    setLoading(false); // 에러 발생 시에도 로딩 완료로 설정
                }
            };

            fetchData();
        }
    }, [rowId, open]);

    if (loading) {
        // return <Typography>{t('loading')}</Typography>; // 로딩 중 메시지
    }

    if (!diagData) {
        return null; // 데이터가 없는 경우 null 반환
    }

    // 개별 모듈의 결과 찾기
    const findResultForModule = (moduleName) => {
        const module = diagData.selfTestResult.find((m) => m.module === moduleName);
        return module ? module.result : null;
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            sx: {
                width: '592px', // 가로 크기 설정
                height: '667px', // 세로 크기 설정
                backgroundColor: '#ebeef8', // 배경 색상 설정
                borderRadius: '8px', // 모서리 둥글기 설정
                border: '1px solid #80befc', // 테두리 설정
            },
        }}>
            <DialogTitle
                sx={{
                    fontSize: '24px', // 폰트 크기 설정
                    fontWeight: 'bold', // 폰트 굵기 설정
                    marginTop: '40px', // 위쪽 여백
                    marginBottom: '5px', // 아래쪽 여백
                    marginLeft: '12px', // 왼쪽 여백
                    color: '#002A70' // 폰트 색상 설정
                }}>{t('self_diag.detail_dialog.title')}
            </DialogTitle>
            <DialogContent sx={{ overflowY: 'hidden' }}>
                <Box border={1} borderColor="#7d7d7d" borderRadius={2} p={2} sx={{ backgroundColor: '#ffffff' }} >
                    <Grid container spacing={2} sx={{ height: 'auto', overflowY: 'visible' }}>

                        <Grid item xs={12} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.model')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {diagData.prodName}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>

                        <Grid item xs={6} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.serial')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {diagData.serial}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.diag_time')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {diagData.date}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>

                        <Grid item xs={2} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.power')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                ON
                            </Typography> */}
                            <img src={findResultForModule('Power') ? "/icon-pass.png" : "/icon-fail.png"} alt="Power Result" width="60px" height="25px" />
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.plunger_motor')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                ON
                            </Typography> */}
                            <img src={findResultForModule('PlungerMotor') ? "/icon-pass.png" : "/icon-fail.png"} alt="Plunger Motor Result" width="60px" height="25px" />
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.camera_blu')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                ON
                            </Typography> */}
                            <img src={findResultForModule('CameraBLU') ? "/icon-pass.png" : "/icon-fail.png"} alt="Camera BLU Result" width="60px" height="25px" />
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.temp_ic')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                ON
                            </Typography> */}
                            <img src={findResultForModule('TempIC') ? "/icon-pass.png" : "/icon-fail.png"} alt="Temp IC Result" width="60px" height="25px" />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>

                        <Grid item xs={2} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.detector_led')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                OFF
                            </Typography> */}
                            <img src={findResultForModule('DetectorLED') ? "/icon-pass.png" : "/icon-fail.png"} alt="Detector Motor Result" width="60px" height="25px" />
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.heater1')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                OFF
                            </Typography> */}
                            <img src={findResultForModule('Heater1') ? "/icon-pass.png" : "/icon-fail.png"} alt="Detector LED Result" width="60px" height="25px" />
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.printer')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                OFF
                            </Typography> */}
                            <img src={findResultForModule('Print') ? "/icon-pass.png" : "/icon-fail.png"} alt="Detector LED Result" width="60px" height="25px" />
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.qrcode')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                OFF
                            </Typography> */}
                            <img src={findResultForModule('Barcode') ? "/icon-pass.png" : "/icon-fail.png"} alt="Detector LED Result" width="60px" height="25px" />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>

                        <Grid item xs={2} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.cat_sensor')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                ON
                            </Typography> */}
                            <img src={findResultForModule('CatridgeSensor') ? "/icon-pass.png" : "/icon-fail.png"} alt="Detector LED Result" width="60px" height="25px" />
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '13px', color: '#002A70', mb: '6px' }}>
                                {t('self_diag.detail_dialog.eqc')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                OFF
                            </Typography> */}
                            <img src={findResultForModule('EQC') ? "/icon-pass.png" : "/icon-fail.png"} alt="Detector LED Result" width="60px" height="25px" />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{
                justifyContent: 'center', // 버튼을 가로로 중앙에 위치시킴
                marginTop: '16px', // 위쪽 마진
                marginBottom: 4, // 아래쪽 마진
            }}>
                <Button onClick={onClose} variant="contained" color="primary" sx={{
                    borderRadius: '10px', // 모서리 둥글기
                    width: '230px', // 가로 크기
                    height: '48px', // 세로 크기
                    fontSize: '18px', // 폰트 크기
                    backgroundColor: '#007dfa'
                }}>
                    {t('button.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}