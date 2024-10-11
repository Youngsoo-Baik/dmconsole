import React, { useState, useEffect } from 'react';
import { Paper, Box } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import apiClient from '../api/apiClient'; // API client import
import Config from '../Config'; // apiUrl 추가
import { getAccessToken } from '../utils/token';

const apiUrl = Config.apiUrl;

const NoRowsOverlay = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '1.5rem',
    color: '#888',
    flexDirection: 'column',
});

const initialRows = [
    { id: 1, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 2, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 3, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 4, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 5, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 6, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 7, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 8, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 9, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 10, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 11, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 12, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 13, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 14, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
    { id: 15, analyte_name: 'PHOS', analyte_id: 'a435', analyte_fullname: 'Alkaline Phosphatase', target_mean: '39.1', sd: '0.46', target_range: '55-121' , unit_si:'mEq/L', unit_non_si:'mmol/L', rule:'2'},
];

const QCMaterialDetailInfoPanel = ({ selectedRow }) => {
    const [rows, setRows] = useState([]);
    const { t } = useTranslation('console');
    const apiRef = useGridApiRef();
    const getRowHeight = (params) => 47;

    const columns = [
        { field: 'id', headerName: `${t('qc_material.detail_dialog.column.no')}`, flex: 1, minWidth: 30, headerAlign: 'center', align: 'center' },
        { field: 'analyte_name', headerName: `${t('qc_material.detail_dialog.column.analyte_name')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'analyte_id', headerName: `${t('qc_material.detail_dialog.column.analyte_id')}`, flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
        { field: 'analyte_fullname', headerName: `${t('qc_material.detail_dialog.column.analyte_fullname')}`, flex: 2, minWidth: 150, headerAlign: 'center', align: 'center' },
        { field: 'target_mean', headerName: `${t('qc_material.detail_dialog.column.target_mean')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'sd', headerName: `${t('qc_material.detail_dialog.column.sd')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'target_range', headerName: `${t('qc_material.detail_dialog.column.target_range')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'unit_si', headerName: `${t('qc_material.detail_dialog.column.unit_si')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'unit_non_si', headerName: `${t('qc_material.detail_dialog.column.unit_non_si')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'rule', headerName: `${t('qc_material.detail_dialog.column.rule')}`, flex: 1, minWidth: 50, headerAlign: 'center', align: 'center' },
    ];

    useEffect(() => {
        // API 호출로 데이터를 가져오는 부분
        apiClient.get(`${apiUrl}/console/qc-materials/${selectedRow}/qc-material-analytes`, {
            headers: {
                Authorization: `Bearer ${getAccessToken}`, // Bearer 토큰 추가
            },
        })
        .then((response) => {
            const fetchedRows = response.data.content.map((item) => ({
                id: item.id,
                analyte_name: item.analyteName,
                analyte_id: item.analyteId,
                analyte_fullname: item.analyteFullName,
                target_mean: item.mean,
                target_range: `${item.min} - ${item.max}`,
                unit_si: item.siUnit,
                unit_non_si: item.unit,
                rule: item.selectedRule,
            }));
            setRows(fetchedRows);
        })
        .catch((error) => {
            console.error('데이터 가져오기 오류:', error);
        });
    }, [selectedRow]);

    return (
        <Paper
            sx={{
                width: '900px',
                height: '720px',
                // padding: '18px',
                borderRadius: '10px',
                boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box sx={{ height: '680px', paddingTop: '10px', paddingLeft: '18px', paddingRight: '18px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={13}
                    apiRef={apiRef}
                    getRowId={(row) => row.id}
                    // rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    hideFooter
                    getRowHeight={getRowHeight}
                    headerHeight={54}
                    slots={{
                        // footer: CustomFooter,
                        noRowsOverlay: () => (
                            <NoRowsOverlay>
                                <img src="nodata.png" alt="No data" />
                                {/* <Typography>No data available</Typography> */}
                            </NoRowsOverlay>
                        ),
                    }}
                    // initialState={{
                    //     pagination: { paginationModel: { pageSize: 13 } },
                    // }}
                    sx={{
                        '&, [class^=MuiDataGrid]': {
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderBottom: 'none',
                            // borderTop: 'none',
                        },
                        '& .MuiDataGrid-columnHeaders div[role="row"]': {
                            backgroundColor: '#f9fafd',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            fontSize: '12px',
                            fontWeight: '800',
                            color: '#7d7d7d',
                        },
                        '& .MuiDataGrid-cell': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontSize: '12px',
                            color: '#494949',
                            height: '47px',
                            backgroundColor: '#ffffff',
                            // borderBottom: '0.5px solid #dddddd',
                        },
                        '& .MuiDataGrid-cellContent': {
                            width: '100%',
                        },
                        // '& .MuiDataGrid-footerContainer': {
                        //     display: 'flex',
                        //     justifyContent: 'center',
                        //     marginTop: '30px',
                        //     backgroundColor: '#ffffff',
                        // },
                        borderBottomLeftRadius: '14px',  // 왼쪽 아래 모서리 라운드 적용
                        borderBottomRightRadius: '14px', // 오른쪽 아래 모서리 라운드 적용
                        overflow: 'hidden',
                        backgroundColor: '#ffffff',
                    }}
                />
            </Box>
        </Paper>);
};

export default QCMaterialDetailInfoPanel;