import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient'; // apiClient import
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Grid, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

// 샘플 데이터 (이 데이터를 rowId로 가져왔다고 가정)
// const rowData = {
//     900: { country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
//     901: { country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
//     902: { country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true }
// };

export default function CustomerDeviceInfoDialog({ open, onClose, rowId }) {
    const { t } = useTranslation('console');
    const [rowData, setRowData] = useState(null); // API 응답 데이터를 저장할 상태

    // const data = rowData[rowId];
    // console.log(rowId);
    // console.log(data);
    // rowId를 통해 API 호출
    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                const response = await apiClient.get(`/console/customer-devices/${rowId}`);
                setRowData(response.data); // 응답 데이터를 rowData에 저장
            } catch (error) {
                console.error('Error fetching device data:', error);
            }
        };

        if (rowId) {
            fetchDeviceData(); // rowId가 존재하면 데이터 호출
        }
    }, [rowId]);

    // rowData가 없을 때 로딩 표시
    if (!rowData) {
        return null; // 데이터를 가져오기 전에는 아무것도 렌더링하지 않음 (또는 로딩 스피너 추가 가능)
    }

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            sx: {
                width: '592px', // 가로 크기 설정
                height: '824px', // 세로 크기 설정
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
            }}>{t('customer_device_list.reg_info_dialog.title')}</DialogTitle>
            <DialogContent sx={{overflowY: 'hidden' }}>
                <Box border={1} borderColor="#7d7d7d" borderRadius={2} p={2}  sx={{backgroundColor: '#ffffff'}} >
                    <Grid container spacing={2} sx={{ height: 'auto', overflowY: 'visible' }}>
                        <Grid item xs={12} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                {t('customer_device_list.reg_info_dialog.customer')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.email} {/* API에서 받은 이메일 */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={12} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.model')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.prodName} {/* API에서 받은 제품명 */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.reg_number')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.regCode} {/* API에서 받은 등록 코드 */}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.serial')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.serial} {/* API에서 받은 시리얼 넘버 */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.ip')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                61.36.16.226
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.connection_date')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.connectionDate} {/* API에서 받은 연결 날짜 */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.reg_date')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.registeredAt} {/* API에서 받은 등록 날짜 */}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.production_date')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.productAt} {/* API에서 받은 생산 날짜 */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.country')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.country} {/* API에서 받은 국가 */}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.manager')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.manager} {/* API에서 받은 담당자 */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={12}  sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                            {t('customer_device_list.reg_info_dialog.reseller')}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                {rowData.reseller} {/* API에서 받은 리셀러 */}
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
                    {t('button.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}