import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Grid, Divider } from '@mui/material';

// 샘플 데이터 (이 데이터를 rowId로 가져왔다고 가정)
const rowData = {
    900: { country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true },
    901: { country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: false },
    902: { country: '파퓨아뉴기니', region: 'N.America', reseller: 'Vitaliv health and Wellenss Clinic', manager: '담당자', model: 'Fluoro Check Heating Block', customer: 'hardtack@nave.com', serial: '2024.12.12', production_date: '2024.12.12', connection_state: true }
};

export default function CustomerDeviceInfoDialog({ open, onClose, rowId }) {
    const data = rowData[rowId];
    console.log(rowId);
    console.log(data);
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
            }}>고객 검사기 등록 정보</DialogTitle>
            <DialogContent sx={{overflowY: 'hidden' }}>
                <Box border={1} borderColor="#7d7d7d" borderRadius={2} p={2}  sx={{backgroundColor: '#ffffff'}} >
                    <Grid container spacing={2} sx={{ height: 'auto', overflowY: 'visible' }}>
                        <Grid item xs={12} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                구매자
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                hardtack7535@naver.com
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={12} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                모델명
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                Fluoro Check ™ Heating Block
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                등록번호
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                08800026300229
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                기기 S/N
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                YVKA0-A00001
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                연결 IP
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                61.36.16.226
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                연결 날짜
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                2023.11.01 13:16
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                등록일
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                2023.08.11
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                출하일
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                2023.08.11
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={7} sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                국가
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                파푸아뉴기니
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                담당자
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                담당자
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider /> {/* Divider 컴포넌트 사용 */}
                        </Grid>
                        <Grid item xs={12}  sx={{ml:1}}>
                            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px', color: '#002A70', mb: '6px' }}>
                                대리점
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '16px', color: '#7d7d7d' }}>
                                원주24시스카이동물메디컬센터
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