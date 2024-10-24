import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SystemInfoPanel from './DeviceInfo/SystemInfoPanel';
import LogFilePanel from './DeviceInfo/LogFilePanel';
import PanelInfoPanel from './DeviceInfo/PanelInfoPanel';
import UpdateHistoryPanel from './DeviceInfo/UpdateHistoryPanel';
import InstrumentCoefPanel from './DeviceInfo/InstrumentCoefPanel';

export default function DeviceManagementDialog({ open, onClose, rowId }) {
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
                <Tabs value={value} onChange={handleChange}  centered
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
                    <Tab label={t('device_list.system_info_tab.title')}
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
                    <Tab label={t('device_list.logfile_tab.title')}
                        sx={{
                            minWidth: '70px',
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
                    <Tab label={t('device_list.panel_info_tab.title')}
                        sx={{
                            minWidth: '104px',
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
                    <Tab label={t('device_list.update_history_tab.title')}
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
                    <Tab label={t('device_list.instrument_coef_tab.title')}
                        sx={{
                            minWidth: '183px',
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
                <Box sx={{ paddingTop: '116px', paddingLeft: '5px', paddingRight: '5px' }}>
                    {value === 0 && <SystemInfoPanel rowId={rowId} />}
                    {value === 1 && <LogFilePanel rowId={rowId} />}
                    {value === 2 && <PanelInfoPanel rowId={rowId} />}
                    {value === 3 && <UpdateHistoryPanel rowId={rowId} />}
                    {value === 4 && <InstrumentCoefPanel rowId={rowId} />}
                </Box>
            </DialogContent>
        </Dialog>
    );
}