import React, { useState, useEffect } from 'react';
import { Paper, Box } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import apiClient from '../api/apiClient'; // API client import
import Config from '../Config'; // apiUrl 추가
import { getAccessToken } from '../utils/token';
import CustomColumnSortedAscendingIcon from '../components/CustomColumnSortedAscendingIcon ';
import CustomColumnSortedDescendingIcon from '../components/CustomColumnSortedDescendingIcon ';

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
    { id: 1, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 2, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 3, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 4, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 5, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 6, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 7, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 8, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 9, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 10, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 11, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 12, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 13, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 14, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 15, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
    { id: 16, analyte_name: 'CREA', result: '-32768', finalod: '-0.999', ref_bound: '-32768 - -32768', unit: 'mg/dl', error_type: '-' },
];

const QCResultsDetailInfoPanel = ({ selectedRow }) => {
    const [rows, setRows] = useState([]);
    const { t } = useTranslation('console');
    const apiRef = useGridApiRef();
    const getRowHeight = (params) => 47;

    console.log(selectedRow);

    // API 호출
    useEffect(() => {
        const fetchControlData = async () => {
            try {
                const token = getAccessToken();
                const response = await apiClient.get(`${apiUrl}/console/control-results/${selectedRow}/control-data`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = response.data.content;

                // 응답 데이터에 맞게 필드명을 변경하여 rows 상태 업데이트
                const formattedRows = data.map((item, index) => ({
                    id: item.id,
                    analyte_name: item.analyteName,
                    result: item.result,
                    finalod: item.finalOd,
                    ref_bound: item.refRange,
                    unit: item.unit,
                    error_type: item.bubbleOccur
                }));

                setRows(formattedRows);
            } catch (error) {
                console.error('Error fetching control data:', error);
            }
        };

        fetchControlData();
    }, [selectedRow]);

    const columns = [
        { field: 'id', headerName: `${t('qc_result.detail_dialog.column.no')}`, flex: 1, minWidth: 70, headerAlign: 'center', align: 'center' },
        { field: 'analyte_name', headerName: `${t('qc_result.detail_dialog.column.analyte_name')}`, flex: 1.5, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'result', headerName: `${t('qc_result.detail_dialog.column.result')}`, flex: 2, minWidth: 150, headerAlign: 'center', align: 'center' },
        { field: 'finalod', headerName: `${t('qc_result.detail_dialog.column.finalod')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'ref_bound', headerName: `${t('qc_result.detail_dialog.column.ref_bound')}`, flex: 2, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'unit', headerName: `${t('qc_result.detail_dialog.column.unit')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
        { field: 'error_type', headerName: `${t('qc_result.detail_dialog.column.error_type')}`, flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    ];

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
            {/* <Box display="flex" alignItems="center" sx={{
                paddingLeft: '26px',  // Left padding
                paddingTop: '26px',   // Top padding
            }}>
                <img src="/icon-update.png" alt="update icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold', color: '#303468' }}>
                    {t('analysis_result.detail_dialog..title')}
                </Typography>
            </Box> */}
            <Box sx={{ height: '680px', paddingTop: '10px', paddingLeft: '18px', paddingRight: '18px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={13}
                    apiRef={apiRef}
                    getRowId={(row) => row.id}
                    // rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    // hideFooterPagination
                    // hideFooterSelectedRowCount
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
                        columnSortedAscendingIcon: CustomColumnSortedAscendingIcon,
                        columnSortedDescendingIcon: CustomColumnSortedDescendingIcon,
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

export default QCResultsDetailInfoPanel;