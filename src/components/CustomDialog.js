import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CustomDialog({
    open,
    handleClose,
    icon,
    title,
    description,
    showCancelButton = false,  // 취소 버튼 표시 여부 (기본값: false)
    onConfirm,  // 확인 버튼 클릭 시 동작
    onCancel  // 취소 버튼 클릭 시 동작 (옵션)
}) {
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
                    height: description ? '266px' : '240px',  // description이 없는 경우 높이를 240px로 설정
                    boxSizing: 'border-box', // padding이 전체 크기에 영향을 주지 않도록 설정
                },
            }}
            maxWidth="xs" // 다이얼로그 크기 조정
        // fullWidth
        >
            <DialogContent sx={{ textAlign: 'center' }}>
                {/* 아이콘 */}
                <Box display="flex" justifyContent="center" mb='10px'>
                    {icon}
                </Box>

                {/* 제목 */}
                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', mb: '10px', color: 'var(--gray-gray-500)' }}>
                    {title}
                </Typography>

                {/* 설명 텍스트 */}
                <Typography variant="body2" sx={{ fontSize: '16px', color: '#494a50' }}>
                    {description}
                </Typography>
            </DialogContent>

            {/* 버튼 구성 */}
            <DialogActions sx={{ justifyContent: 'center', mb: '21px' }}>
                {showCancelButton ? (
                    <>
                        {/* 취소 버튼 */}
                        <Button
                            variant="outlined"
                            sx={{
                                fontSize: '16px',
                                fontWeight: '600px',
                                width: '150px',
                                height: '48px',
                                borderRadius: '10px',
                                marginRight: '16px',
                                color: '#8b8fa8', 
                                border: 'solid 1px var(--gray-gray-200)'
                            }}
                            onClick={onCancel || handleClose}
                        >
                            {t('button.cancel')}
                        </Button>

                        {/* 확인 버튼 */}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "var(--primary-blue-500)",
                                fontSize: '16px',
                                fontWeight: '600px',
                                width: '150px',
                                height: '48px',
                                borderRadius: '10px'
                            }}
                            onClick={onConfirm || handleClose}
                        >
                            {t('button.confirm')}
                        </Button>
                    </>
                ) : (
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "var(--primary-blue-500)",
                            fontSize: '16px',
                            fontWeight: '600px',
                            width: '332px',
                            height: '48px',
                            borderRadius: '10px'
                        }}
                        onClick={onConfirm || handleClose}
                    >
                        {t('button.confirm')}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}