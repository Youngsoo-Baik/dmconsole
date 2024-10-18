import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Grid, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiClient from '../api/apiClient'; // API client import
import Config from '../Config'; // apiUrl 추가
import { getAccessToken } from '../utils/token';
const apiUrl = Config.apiUrl;

// 샘플 데이터 (이 데이터를 rowId로 가져왔다고 가정)
// const rowData = {
//     900: { country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
//     901: { country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
//     902: { country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true }
// };

export default function ErrorReportInfoDialog({ open, onClose, rowId }) {
    const { t } = useTranslation('console');
    const [data, setData] = useState(null);
    // const data = rowData[rowId];
    // console.log(rowId);
    // console.log(data);
    useEffect(() => {
        if (rowId && open) {
            apiClient.get(`${apiUrl}/console/error-messages/${rowId}`, {
                headers: {
                    Authorization: `Bearer ${getAccessToken}`, // Bearer 토큰 추가
                },
            })
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error('데이터를 가져오는 중 에러 발생:', error);
                });
        }
    }, [rowId, open]);

    if (!data) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            sx: {
                width: '592px', // 가로 크기 설정
                height: '744px', // 세로 크기 설정
                backgroundColor: '#ebeef8', // 배경 색상 설정
                borderRadius: '8px', // 모서리 둥글기 설정
                border: '1px solid #80befc', // 테두리 설정
            },
        }}>
            <DialogTitle sx={{
                fontSize: '24px', // 폰트 크기 설정
                fontWeight: 'bold', // 폰트 굵기 설정
                marginTop: '40px', // 위쪽 여백
                marginBottom: '5px', // 아래쪽 여백
                marginLeft: '12px', // 왼쪽 여백
                color: '#002A70' // 폰트 색상 설정
            }}>{t('errors_report.detail_dialog.title')}</DialogTitle>
            <DialogContent sx={{ overflowY: 'hidden' }}>
                <Box border={1} borderColor="#7d7d7d" borderRadius={2} p={2} sx={{ backgroundColor: '#ffffff' }} >
                    <Grid container spacing={2} sx={{ height: 'auto', overflowY: 'visible' }}>
                        <Grid item xs={12} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                {t('errors_report.detail_dialog.model')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {data.prodName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={12} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                {t('errors_report.detail_dialog.serial')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {data.serial}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                {t('errors_report.detail_dialog.date')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {data.date}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                {t('errors_report.detail_dialog.sent')}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {data.isSent ? 'DONE' : 'NOT DONE'}
                            </Typography> */}
                            {data.isSent ? <img src="/sent_complete.png" width="25px" height="25px"></img> : <img src="/sent_notdone.png" width="25px" height="25px"></img>}
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={12} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                {t('errors_report.detail_dialog.view_log')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {data.viewLog}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={12} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                {t('errors_report.detail_dialog.error_title')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {data.errorTitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ ml: 1 }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                {t('errors_report.detail_dialog.cat_type')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {data.panelType || '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                {t('errors_report.detail_dialog.control_type')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {data.controlType || '-'}
                            </Typography>
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
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
}