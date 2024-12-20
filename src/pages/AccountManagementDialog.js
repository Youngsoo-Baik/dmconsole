import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AccountMemberInfoPanel from './AccountMemberInfoPanel';
import AccountPasswordInfoPanel from './AccountPasswordInfoPanel';


export default function AccountManagementDialog({ open, handleClose, selectedRow, onListRefresh }) {
    const [value, setValue] = useState(0);
    const { t } = useTranslation('console');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDeleteSuccess = () => {
        onListRefresh();  // 리스트를 갱신하는 콜백 호출
        handleClose();  // 다이얼로그 닫기
    };
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            // width="972px"
            fullWidth
            disableEscapeKeyDown // Prevent closing with Escape key
            disableBackdropClick // Prevent closing when clicking outside
            PaperProps={{
                sx: {
                    width: '972px',
                    height: '594px',
                    borderRadius: '14px', // Rounded corners
                    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.1)', // Apply the shadow here
                },
            }}
        >
            <DialogTitle>
                {/* IconButton for the custom close icon */}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    {/* Custom close icon as an image */}
                    <img
                        src={'./button_close_cross.png'} // Use the imported custom image
                        alt="close"
                        style={{ width: '30px', height: '30px' }} // Adjust the size of the custom icon
                    />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Tabs value={value} onChange={handleChange} centered
                    sx={{
                        position: 'absolute', // Ensure it's positioned relative to the dialog
                        top: '56px',
                        left: '37px',

                        '& .MuiTabs-indicator': {
                            border: 'none', // Remove the indicator border
                            backgroundColor: '#007dfa', // Change the color of the indicator
                            height: '8px', // Change the height of the indicator
                        },
                    }}>
                    <Tab label={t('account_list.account_mod_dialog.title')}
                        sx={{
                            minWidth: '114px',
                            // width: '92px',
                            height: '24px',
                            marginBottom: '12px',
                            fontFamily: 'Pretendard',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            fontStretch: 'normal',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            letterSpacing: 'normal',
                            textAlign: 'left',
                            color: '#303468',
                        }} />
                    <Tab label={t('account_list.pass_mod_dialog.title')}
                        sx={{
                            minWidth: '109px',
                            height: '24px',
                            marginBottom: '12px',
                            fontFamily: 'Pretendard',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            fontStretch: 'normal',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            letterSpacing: 'normal',
                            textAlign: 'left',
                            color: '#303468',
                        }} />
                </Tabs>
                {/* Conditionally render each TabPanel */}
                <Box sx={{ paddingTop: '136px', paddingLeft: '5px', paddingRight: '5px' }}>
                    {value === 0 && (
                        <AccountMemberInfoPanel
                            open={open}
                            handleClose={handleClose}
                            selectedRow={selectedRow}
                            onDeleteSuccess={handleDeleteSuccess} // onDeleteSuccess 추가
                        />
                    )}
                    {value === 1 && <AccountPasswordInfoPanel open={open} handleClose={handleClose} selectedRow={selectedRow} />}
                </Box>
            </DialogContent>
        </Dialog>
    );
}