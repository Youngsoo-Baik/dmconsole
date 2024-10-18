import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Divider, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiClient from '../../api/apiClient'; // API client import
import Config from '../../Config'; // apiUrl 추가
import { getAccessToken } from '../../utils/token';

const apiUrl = Config.apiUrl;

const SystemInfoPanel = (rowId) => {
    const { t } = useTranslation('console');
    const [systemInfo, setSystemInfo] = useState(null);

    console.log(rowId.rowId);
    useEffect(() => {
        const fetchSystemInfo = async () => {
            try {
                const token = getAccessToken(); // Assuming you have a function to get the access token
                const response = await apiClient.get(`${apiUrl}/console/devices/${rowId.rowId}/system-info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSystemInfo(response.data);
            } catch (error) {
                console.error('Error fetching system info:', error);
            }
        };

        if (rowId) {
            fetchSystemInfo();
        }
    }, [rowId]);

    if (!systemInfo) {
        return <Typography>Loading...</Typography>;
    }
    return (
        <Paper
            sx={{
                width: '900px',
                height: '455px',
                // padding: '18px',
                borderRadius: '10px',
                boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Grid container spacing={2} sx={{ paddingLeft: '14px' }}>
                {/* Title Section */}
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <img src="/icon-setting.png" alt="system icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                        <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#303468' }}>
                            {t('device_list.system_info_tab.title')}
                        </Typography>
                    </Box>
                </Grid>

                {/* Divider after the title */}
                <Grid item xs={12}>
                    <Divider sx={{ width: '864px', height: '1.5px', backgroundColor: '#cbcbcb' }} />
                </Grid>

                {/* System Information Rows */}
                <Grid container item xs={12} spacing={1} sx={{}}>
                    {/* First Row */}
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.serial')}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.serial}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.mac')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.mac}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ width: '864px', backgroundColor: '#cbcbcb', marginTop: '10px', marginBottom: '10px' }} />
                    </Grid>

                    {/* Second Row */}
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.system')}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.sysVersion}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.qte')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.qteVersion}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ width: '864px', backgroundColor: '#cbcbcb', marginTop: '10px', marginBottom: '10px' }} />
                    </Grid>

                    {/* Third Row */}
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.bootloader')}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.bootVersion}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.application')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.appVersion}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ width: '864px', backgroundColor: '#cbcbcb', marginTop: '10px', marginBottom: '10px' }} />
                    </Grid>

                    {/* Fourth Row */}
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.kernel')}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.kernelVersion}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.dsp')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.dspVersion}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ width: '864px', backgroundColor: '#cbcbcb', marginTop: '10px', marginBottom: '10px' }} />
                    </Grid>

                    {/* Fifth Row */}
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.rootfs')}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.rootFsVersion}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.xml')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>{systemInfo.xmlVersion}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SystemInfoPanel;