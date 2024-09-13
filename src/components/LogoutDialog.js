import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { useTranslation } from 'react-i18next';


export default function LogoutDialog({ open, onClose, onLogout }) {
    const { t } = useTranslation('console');

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: '476px',
                    height: '210px',
                    borderRadius: '12px',             // 모서리를 둥글게 설정
                    border: '1px solid #80BEFC',      // 외곽선 색상 설정
                    // padding: '5px',
                    textAlign: 'center',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',  // 드롭 섀도우 효과 추가
                },
            }}
        >
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',  // 가로 중앙 정렬
                        alignItems: 'center',      // 세로 중앙 정렬
                    }}
                >
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
                </Box>
                <Typography variant="h6" sx={{
                    fontFamily: 'Pretendard, sans-serif',  // 폰트 설정
                    fontSize: '20px',                      // 폰트 크기 설정
                    fontWeight: 600,                       // 폰트 굵기 설정 (semi-bold)
                    color: '#494949',                       // 폰트 색상 설정
                    mt: '14px'
                }}>
                    {t('logout_dialog.description')}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', mb: '20px' }}>
                <Button onClick={onClose}
                    variant="outlined"
                    sx={{
                        fontSize: '16px', width: '160px', height: '48px', borderRadius: '10px', borderColor: '#DCDFE3',  // 외곽선 색상 설정
                        color: '#8B8FA8'
                    }}>
                    {t('button.cancel')}
                </Button>
                <Button
                    onClick={onLogout}
                    // variant="contained"
                    color="primary"
                    sx={{ fontSize: '16px', color: '#ffffff', width: '160px', height: '48px', ml: 3, borderRadius: '10px', backgroundColor: '#007DFA' }}>
                    {t('button.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}