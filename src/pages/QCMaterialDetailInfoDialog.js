import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import QCMaterialDetailInfoPanel from './QCMaterialDetailInfoPanel';

export default function QCMaterialDetailInfoDialog({ open, onClose, selectedRow }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { t } = useTranslation('console');

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            // width="972px"
            fullWidth
            disableEscapeKeyDown // Prevent closing with Escape key
            disableBackdropClick // Prevent closing when clicking outside
            PaperProps={{
                sx: {
                    width: '972px',
                    height: '881px',
                    borderRadius: '14px', // Rounded corners
                    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.1)', // Apply the shadow here
                },
            }}
        >
            <DialogTitle>
                {/* IconButton for the custom close icon */}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                <Tabs value={value} onChange={handleChange} variant="scrollable" centered
                    sx={{
                        position: 'absolute', // Ensure it's positioned relative to the dialog
                        top: '36px',
                        left: '37px',
                        
                        '& .MuiTabs-indicator': {
                            border: 'none', // Remove the indicator border
                            backgroundColor: '#007dfa', // Change the color of the indicator
                            height: '8px', // Change the height of the indicator
                        },
                    }}>
                    <Tab label={t('qc_material.detail_dialog.title')}
                        sx={{
                            minWidth: '92px',
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
                    
                </Tabs>
                {/* Conditionally render each TabPanel */}
                <Box sx={{ paddingTop: '100px', paddingLeft: '5px', paddingRight: '5px' }}>
                    <QCMaterialDetailInfoPanel selectedRow={selectedRow} />
                </Box>
            </DialogContent>
        </Dialog>
    );
}