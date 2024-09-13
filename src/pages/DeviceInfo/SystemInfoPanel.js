import React from 'react';
import { Paper, Grid, Typography, Divider, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SystemInfoPanel = () => {
    const { t } = useTranslation('console');

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
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>YVKA0-A00001</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.mac')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>34:A3:BF:25:64:AE</Typography>
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
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>1.00.15.0011</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.qte')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>1.00.00.0001</Typography>
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
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>1.00.03.0001</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.application')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>2.08.52.0026</Typography>
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
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>0.00.00.0001</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.dsp')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>0.00.00.0001</Typography>
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
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>1.00.15.0011</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body2" sx={{ color: '#8b8fa8', fontWeight: 'bold', paddingLeft: '30px' }}>
                            {t('device_list.system_info_tab.xml')}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" sx={{ color: '#7d7d7d' }}>1.06.67.0002</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SystemInfoPanel;