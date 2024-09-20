import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CustomDialog({ open, handleClose, icon, title, description }) {
    const { t } = useTranslation('console');

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    borderRadius: 10,
                    padding: '10px',
                    border: 'solid 1px var(--primary-blue-400)',
                    width: '476px',  // 가로 크기
                    height: '266px', // 세로 크기
                    boxSizing: 'border-box', // padding이 전체 크기에 영향을 주지 않도록 설정
                },
            }}
            maxWidth="xs" // 다이얼로그 크기 조정
            // fullWidth
        >
            <DialogContent sx={{ textAlign: 'center' }}>
                {/* 아이콘 */}
                <Box display="flex" justifyContent="center" mb={2}>
                    {icon}
                </Box>

                {/* 제목 */}
                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', mb: 1, color: 'var(--gray-gray-500)' }}>
                    {title}
                </Typography>

                {/* 설명 텍스트 */}
                <Typography variant="body2" sx={{ fontSize: '16px', color: '#494a50' }}>
                    {description}
                </Typography>
            </DialogContent>

            {/* 확인 버튼 */}
            <DialogActions sx={{ justifyContent: 'center', mb: '21px' }}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: "var(--primary-blue-500)", fontSize: '16px', fontWeight: '600px', width: '332px', height: '48px', borderRadius: '10px' }}
                    onClick={handleClose}  // 다이얼로그 닫기
                >
                    {t('button.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}